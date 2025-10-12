import { Button, Divider, ScrollArea } from "reshaped"
import { TextSection } from "./components/text-section/component"
import "./style.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function TermsAndConditions() {
  const navigate = useNavigate()

  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="terms-and-conditions-container flex-c">
      <h1>📑 Términos y Condiciones de <span>Sapiens360</span></h1>
      <p><b>Última actualización:</b> <i>27/09/2025</i></p>
      <ScrollArea height="600px">
        <TextSection number={1} title="Identificación del responsable">
          El sistema web de gestión académica <b>Sapiens360</b> (en adelante, “el Sistema”) es desarrollado y administrado por <b>Gandel Solutions</b>, sin contar con una ubicación física, pero con domicilio legal en Cochabamba, Bolivia.
          <br />
          Para consultas de contacto: 📧 conctact@sapiens-360.xyz | 📱 +591 65330533.
        </TextSection>

        <Divider />

        <TextSection number={2} title="Aceptación de los Términos">
          Al acceder y utilizar el Sistema, el usuario acepta expresamente los presentes Términos y Condiciones (en adelante, “TyC”). En caso de no estar de acuerdo, deberá abstenerse de utilizarlo.
        </TextSection>

        <Divider />

        <TextSection number={3} title="Objeto del Sistema">
          <b>Sapiens360</b> es una plataforma web de gestión académica que provee a las instituciones educativas herramientas digitales para la administración de matrículas, calificaciones, asistencia, reportes, comunicación institucional y otros servicios relacionados.
        </TextSection>

        <Divider />

        <TextSection number={4} title="Creación y administración de cuentas">
          <ul>
            <li>
              Las cuentas de usuario solo podrán ser creadas por el Director de la institución o por personal autorizado expresamente por este.
            </li>

            <li>
              Ningún usuario podrá crear cuentas por cuenta propia.
            </li>

            <li>
              Todas las cuentas deberán registrarse con correos institucionales; queda prohibido el uso de correos de dominios como Gmail, Outlook, ProtonMail u otros similares.
            </li>

            <li>
              El acceso a las cuentas es personal e intransferible. Cada usuario es responsable del resguardo de sus credenciales.
            </li>

          </ul>
        </TextSection>

        <Divider />

        <TextSection number={5} title="Monitoreo de comunicaciones y contenidos">
          <ul>
            <li>
              Con el fin de garantizar un uso correcto y evitar actividades ilícitas, <b>Sapiens360</b> podrá monitorear en todo momento los mensajes y llamadas realizados a través del Sistema, así como grabar dichas llamadas.
            </li>
            <li>
              Las grabaciones podrán estar disponibles para los usuarios implicados en la comunicación, siempre que exista justificación académica, administrativa o legal.
            </li>
            <li>
              El Sistema también podrá revisar los contenidos que suban los usuarios (documentos, mensajes, archivos) con el objetivo de prevenir usos indebidos.
            </li>
          </ul>
        </TextSection>

        <Divider />

        <TextSection number={6} title="Protección de datos personales">
          <ul>
            <li>
              El tratamiento de datos se ajusta a la Constitución Política del Estado Plurinacional de Bolivia y la Ley N° 164.
            </li>
            <li>
              Los datos recopilados (identificación, registros académicos, comunicaciones internas, grabaciones de llamadas y mensajes) serán utilizados únicamente para fines académicos, administrativos y de seguridad dentro de la plataforma.
            </li>
            <li>
              Los usuarios podrán solicitar acceso, actualización o eliminación de sus datos, salvo aquellos que deban conservarse por obligación institucional o legal.
            </li>
          </ul>
        </TextSection>

        <Divider />

        <TextSection number={7} title="Propiedad intelectual">
          <ul>
            <li>
              El software, código fuente, diseño, nombre comercial y funcionalidades de Sapiens360 son propiedad de <b>Gandel Solutions</b>.
            </li>
            <li>
              El contenido académico ingresado por las instituciones sigue siendo propiedad de estas, aunque podrá ser procesado dentro del Sistema para su correcto funcionamiento.
            </li>
          </ul>
        </TextSection>

        <Divider />

        <TextSection number={8} title="Condiciones de uso">
          Los usuarios se comprometen a:

          <ul>
            <li>
              Utilizar el Sistema únicamente con fines académicos y legítimos.
            </li>
            <li>
              No manipular, dañar ni intentar vulnerar la seguridad del Sistema.
            </li>
            <li>
              No utilizar correos no institucionales para el acceso.
            </li>
            <li>
              No suplantar la identidad de otros usuarios.
            </li>
          </ul>
        </TextSection>

        <Divider />

        <TextSection number={9} title="Disponibilidad del servicio">
          <ul>
            <li>
              El Sistema se ofrece “tal cual” y “según disponibilidad”.
            </li>
            <li>
              Podrán existir interrupciones por mantenimiento, actualizaciones o fallas técnicas.
            </li>
            <li>
              <b>Sapiens360</b> no será responsable por pérdidas de datos causadas por ataques informáticos, problemas de conexión del usuario u otros factores externos.
            </li>
          </ul>
        </TextSection>

        <Divider />
        <TextSection number={10} title="Pagos, suspensión y devoluciones">
          <ul>
            <li>
              En caso de suspensión del acceso al tenant o institución por mal uso del Sistema, no se realizarán devoluciones de pagos efectuados.
            </li>
            <li>
              Únicamente se considerará la devolución en casos de mal funcionamiento atribuible directamente al Sistema y no a un mal uso por parte de la institución o los usuarios.
            </li>
          </ul>
        </TextSection>

        <Divider />

        <TextSection number={11} title="Responsabilidad">
          <ul>
            <li>
              La información académica ingresada en el Sistema es responsabilidad de las instituciones y usuarios que la registran.
            </li>
            <li>
              <b>Sapiens360</b> no garantiza la exactitud de los datos introducidos por terceros.
            </li>
            <li>
              El Sistema no se responsabiliza por daños derivados de mal uso, incumplimiento de estos TyC o falta de seguridad en los dispositivos de los usuarios.
            </li>
          </ul>
        </TextSection>

        <Divider />

        <TextSection number={12} title="Suspensión o cancelación de cuentas">
          <b>Sapiens360</b> podrá suspender o cancelar cuentas cuando:

          <ul>
            <li>
              Se detecte uso indebido o ilícito del Sistema.
            </li>
            <li>
              Se incumplan los presentes TyC.
            </li>
            <li>
              Exista requerimiento legal o administrativo por parte de autoridades bolivianas.
            </li>
          </ul>
        </TextSection>

        <Divider />

        <TextSection number={13} title="Modificaciones a los TyC">
          <ul>
            <li>
              Los TyC podrán ser modificados en cualquier momento.
            </li>
            <li>
              Las modificaciones se publicarán dentro del propio Sistema, se reflejarán en un apartado visible en la página principal y se enviará copia específicamente a los Directores de las instituciones usuarias.
            </li>
          </ul>
        </TextSection>

        <Divider />

        <TextSection number={14} title="Ley aplicable y jurisdicción">
          <ul>
            <li>
              Los presentes TyC se rigen por las leyes del Estado Plurinacional de Bolivia.
            </li>
            <li>
              Cualquier controversia será resuelta por los tribunales competentes de Cochabamba.
            </li>
          </ul>
        </TextSection>

        <Divider />

        <TextSection number={15} title="Contacto">
          Para consultas sobre estos TyC, comuníquese a:
          📧 contact@sapiens-360.xyz
          📍 Mi casa
        </TextSection>

        <Divider />
      </ScrollArea>
      <div className="tac-actions-section flex-c">
        <div className="tac-check flex-r">
          <input type="checkbox" name="tac-check" id="tac-check" onClick={() => setIsChecked(!isChecked)} />
          <p>He leído y acepto los términos y condiciones</p>
        </div>
        <Button color="primary" rounded disabled={!isChecked} onClick={() => navigate("/app/registration/principal")}>Continuar</Button>
      </div>
    </div>
  )
}