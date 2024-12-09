import useSWR from "swr";
import styles from "./styles.module.css";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function Status() {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Status</h1>
      <UpdatedAt />
      <PostgresInfo />
    </div>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <div className={styles.div}>
      <p>Última atualização: {updatedAtText}</p>
    </div>
  );
}

function PostgresInfo() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let postgresInfo = "Carregando...";

  if (!isLoading && data) {
    postgresInfo = data.dependencies.database;
  }

  return (
    <div className={styles.div}>
      <p>Versão do PostgreSQL: {postgresInfo.version}</p>
      <p>Conexões abertas: {postgresInfo.opened_connections}</p>
      <p>Conexões máximas: {postgresInfo.max_connections}</p>
    </div>
  );
}
