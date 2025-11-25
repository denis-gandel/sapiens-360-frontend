import {
  FileUp,
  Sheet,
  Loader2
} from "lucide-react"
import { useEffect, useState } from "react";
import {
  Button,
  Dismissible,
  FileUpload,
  Link,
  Modal,
  useToggle,
  View,
  Text
} from "reshaped"
import { read, utils } from "xlsx";
import { Toaster } from "../../../../../../../../utils/toaster";
import { UserService } from "../../../../../../../../services";
import type { User } from "../../../../../../../../models";
import { useUserContext } from "../../../../../../../../contexts";

export const ExcelUpload = () => {

  const { activate, active, deactivate } = useToggle()
  const toaster = new Toaster()
  const { me } = useUserContext()

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const userService = new UserService();

  const handleFileChange = (e: { value: File[]; }) => {
    const selectedFile = e.value[0];
    if (!selectedFile) return;

    const validExtensions: string[] = ["xlsx", "xls", "csv"];
    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase() || "";

    if (!validExtensions.includes(fileExtension)) {
      setError("Solo se permiten archivos Excel o CSV.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(0);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        const workbook = read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(sheet);

        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < jsonData.length; i++) {
          const row: any = jsonData[i];

          const user: User = {
            firstnames: row["Nombres"],
            lastnames: row["Apellidos"],
            ci: row["CI"]?.toString(),
            email: row["Correo"],
            password: row["ContraseÃ±a"],
            phone: row["Telefono"]?.toString(),
            role_id: row["Rol ID"],
            gender: row["Genero"],
            birthdate: row["Fecha Nacimiento"] ? new Date(row["Fecha Nacimiento"]) : null,
            tenant_id: me?.tenant_id
          };

          try {
            await userService.store(user);
            successCount++;
          } catch (err) {
            console.error("Error uploading user:", user, err);
            errorCount++;
          }

          setProgress(Math.round(((i + 1) / jsonData.length) * 100));
        }

        toaster.success(`Carga completada: ${successCount} exitosos, ${errorCount} fallidos.`);
        deactivate();
        setFile(null);
        setProgress(0);

      } catch (err) {
        console.error(err);
        toaster.critical("Error al procesar el archivo.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    if (error) {
      toaster.warning(error)
    }
  }, [error])

  return (
    <>
      <Button icon={FileUp} color="primary" onClick={activate} rounded>Cargar usuarios</Button>
      <Modal active={active} onClose={!loading ? deactivate : () => { }} position="center">
        <Dismissible onClose={!loading ? deactivate : () => { }} closeAriaLabel="Close modal">
          <Modal.Title>Importar usuarios desde Excel</Modal.Title>
        </Dismissible>

        <View paddingTop={5} align="center" gap={3} maxWidth="100%">
          {!loading ? (
            <FileUpload name="file" onChange={handleFileChange}>
              Drop files to attach, or{" "}
              <FileUpload.Trigger>
                <Link variant="plain">browse</Link>
              </FileUpload.Trigger>
            </FileUpload>
          ) : (
            <View align="center" gap={2}>
              <Loader2 className="animate-spin" />
              <Text>Procesando... {progress}%</Text>
            </View>
          )}

          {file && !loading && (
            <div className="flex-r ">
              <Sheet color="#0f0" />
              <p>{file.name}</p>
            </div>
          )}

          {file && !loading && (
            <Button color="primary" onClick={handleUpload} fullWidth>
              Subir y Procesar
            </Button>
          )}
        </View>
      </Modal>
    </>
  )
}