import { Avatar, FormControl, Grid, TextField, View } from "reshaped";
import { useSapiensLayoutContext, useUserContext } from "../../../../contexts";
import { useEffect } from "react";

export function Profile() {
  const { me } = useUserContext();
  const { setTitle, setIsLoading } = useSapiensLayoutContext();

  useEffect(() => {
    setIsLoading(true);
    setTitle("Perfil");
    setIsLoading(false);
  }, []);

  const getInitials = (shortname: string) => {
    const parts = shortname.trim().split(" ");
    const initials = parts
      .filter(Boolean)
      .map((p) => p[0].toUpperCase())
      .join("");
    return initials;
  };

  return (
    <View padding={5} align="center">
      <Avatar
        size={48}
        src={me?.image_url ?? ""}
        initials={getInitials(me?.shortname ?? "")}
      />
      <Grid columns={1} width="100%" gap={6}>
        <FormControl>
          <FormControl.Label>Nombres</FormControl.Label>
          <TextField name="name" value={me?.firstnames ?? ""} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Apellidos</FormControl.Label>
          <TextField name="lastnames" value={me?.lastnames ?? ""} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Nombre corto</FormControl.Label>
          <TextField name="shortname" value={me?.shortname ?? ""} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Correo electrónico</FormControl.Label>
          <TextField name="email" value={me?.email ?? ""} />
        </FormControl>
        <FormControl>
          <FormControl.Label>CI</FormControl.Label>
          <TextField name="ci" value={me?.ci ?? ""} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Fecha de nacimiento</FormControl.Label>
          <TextField name="birthdate" value={me?.birthdate?.toString() ?? ""} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Genero</FormControl.Label>
          <TextField name="gender" value={me?.gender ?? ""} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Telefono</FormControl.Label>
          <TextField name="phone" value={me?.phone ?? ""} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Direccion</FormControl.Label>
          <TextField name="address" value={me?.address ?? ""} />
        </FormControl>
      </Grid>
    </View>
  );
}
