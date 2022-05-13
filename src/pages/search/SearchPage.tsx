import { Helmet } from "react-helmet-async";

import { Layout } from "../../components/layout/Layout";
import { Map } from "./Map";

export default function SearchPage() {
  return (
    <Layout header={{ absolute: true }}>
      <Helmet>
        <title>Search for Taxi</title>
      </Helmet>
      <Map />
    </Layout>
  );
}
