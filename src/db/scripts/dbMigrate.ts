import "dotenv/config"; // configurar acceso a las variables de entorno del archivo .env
import path from "node:path";
import fs from "node:fs";
import { query } from "../database";
import { JSONStorage, Umzug } from "umzug";

const migrator = new Umzug({
  migrations: { glob: path.join(__dirname, "..", "migrations", "*.ts") }, // directorio de migraciones
  context: { query },  // objeto que estará disponible en funciones 'up' y 'down' en archivos de migración
  storage: new JSONStorage({
    path: path.join(__dirname, "..", "migrations", "migrations.json"), // ubicación del archivo de historial de migraciones
  }),
  logger: console,
  create: { // configuración de la acción 'create' (crear archivos de migración)
    folder: path.join(__dirname, "..", "migrations"), // directorio de destino
    template: (filepath) => [ // plantilla base custom
      [
        filepath,
        fs
          .readFileSync(
            path.join(__dirname, "..", "template/migration-template.ts")
          )
          .toString(),
      ],
    ],
  },
});

export type Migration = typeof migrator._types.migration; // tipo de la función de migración ('up' p 'down')

migrator.runAsCLI(); // iniciar CLI