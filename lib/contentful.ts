// lib/contentful.ts
import { Document } from "@contentful/rich-text-types";

// GraphQL endpoint
const GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

// GraphQL query for distributors list (minimal data)
const FABRICANTES_QUERY = `
  query GetFabricantes {
    fabricanteCollection {
      items {
        sys { id }
        nombre
        logo {
          url
        }
        descripcionCorta
      }
    }
  }
`;

// GraphQL query for individual fabricante page (complete data)
const FABRICANTE_BY_SLUG_QUERY = `
  query GetFabricanteBySlug($slug: String!) {
    fabricanteCollection(where: { sys: { id: $slug } }, limit: 1) {
      items {
        sys { id }
        nombre
        logo {
          url
        }
        descripcionCorta
        descripcionLarga {
          json
        }
        imagenPortada {
          url
        }
      }
    }
  }
`;

// GraphQL query for products by fabricante
const PRODUCTOS_BY_FABRICANTE_QUERY = `
  query GetProductosByFabricante($fabricanteId: String!) {
  productoCollection(
    where: { fabricante: { sys: { id: $fabricanteId } } }
  ) {
    items {
      sys { id }
      nombre
      descripcionCorta
      categoria
      portada {
        url
      }
      logoPortada {
        url
      }
    }
  }
}


`;

// GraphQL query for static generation
const FABRICANTE_SLUGS_QUERY = `
  query GetFabricanteSlugs {
    fabricanteCollection {
      items {
        sys { id }
      }
    }
  }
`;

// GraphQL query for individual product page (complete data)
const PRODUCTO_BY_SLUG_QUERY = `
  query GetProductoBySlug($slug: String!) {
    productoCollection(where: { sys: { id: $slug } }, limit: 1) {
      items {
        sys { id }
        nombre
        descripcionCorta
        descripcionLarga {
          json
        }
        portada {
          url
        }
        imagenesCollection {
          items {
            url
          }
        }
        fichaTecnica {
          url
          title
        }
        fabricante {
          sys { id }
          nombre
        }
      }
    }
  }
`;

// GraphQL query for product slugs
const PRODUCTO_SLUGS_QUERY = `
  query GetProductoSlugs {
    productoCollection {
      items {
        sys { id }
      }
    }
  }
`;

// GraphQL query for main products (principal = true)
const PRODUCTOS_PRINCIPALES_QUERY = `
  query GetProductosPrincipales {
    productoCollection(where: { principal: true }) {
      items {
        sys { id }
        nombre
        descripcionCorta
        categoria
        portada {
          url
        }
        logoPortada {
          url
        }
      }
    }
  }
`;

// GraphQL response types (raw data from Contentful)
interface FabricanteGraphQLResponse {
  sys: { id: string };
  nombre: string;
  logo: { url: string };
  descripcionCorta: string;
}

interface ProductoGraphQLResponse {
  sys: { id: string };
  nombre: string;
  descripcionCorta: string;
  categoria: string | null;
  portada: { url: string };
  logoPortada: { url: string } | null;
}

interface FabricanteCompleteGraphQLResponse {
  sys: { id: string };
  nombre: string;
  logo: { url: string };
  descripcionCorta: string;
  descripcionLarga: { json: Document };
  imagenPortada: { url: string };
}

interface ProductoCompleteGraphQLResponse {
  sys: { id: string };
  nombre: string;
  descripcionCorta: string;
  descripcionLarga: { json: Document };
  portada: { url: string };
  imagenesCollection: {
    items: { url: string }[];
  };
  fichaTecnica?: {
    url: string;
    title: string;
  };
  fabricante: {
    sys: { id: string };
    nombre: string;
  };
}

// Application types (processed data for the app)
export interface Distributor {
  id: string;
  nombre: string;
  logo: string;
  descripcion_corta: string;
}

export interface Producto {
  id: string;
  nombre: string;
  descripcion_corta: string;
  categoria: string | null;
  imagen_portada: string;
  logo_portada: string;
}

export interface Fabricante {
  id: string;
  nombre: string;
  logo: string;
  descripcion_corta: string;
  descripcion_larga: Document;
  imagen_portada: string;
  productos: Producto[];
}

export interface ProductoCompleto {
  id: string;
  nombre: string;
  descripcion_corta: string;
  descripcion_larga: Document;
  imagen_portada: string;
  imagenes: string[];
  ficha_tecnica?: {
    url: string;
    title: string;
  };
  fabricante: {
    id: string;
    nombre: string;
  };
}

// GraphQL parsing functions
function parseDistributorFromGraphQL(
  item: FabricanteGraphQLResponse
): Distributor {
  return {
    id: item.sys.id,
    nombre: item.nombre,
    logo: item.logo.url,
    descripcion_corta: item.descripcionCorta,
  };
}

function parseProductoFromGraphQL(item: ProductoGraphQLResponse): Producto {
  return {
    id: item.sys.id,
    nombre: item.nombre,
    descripcion_corta: item.descripcionCorta,
    categoria: item.categoria,
    imagen_portada: item.portada.url,
    logo_portada: item.logoPortada?.url || item.portada.url,
  };
}

function parseFabricanteFromGraphQL(
  item: FabricanteCompleteGraphQLResponse
): Fabricante {
  return {
    id: item.sys.id,
    nombre: item.nombre,
    logo: item.logo.url,
    descripcion_corta: item.descripcionCorta,
    descripcion_larga: item.descripcionLarga.json,
    imagen_portada: item.imagenPortada.url,
    productos: [], // Will be populated separately
  };
}

function parseProductoCompletoFromGraphQL(
  item: ProductoCompleteGraphQLResponse
): ProductoCompleto {
  return {
    id: item.sys.id,
    nombre: item.nombre,
    descripcion_corta: item.descripcionCorta,
    descripcion_larga: item.descripcionLarga.json,
    imagen_portada: item.portada.url,
    imagenes: item.imagenesCollection.items.map((img) => img.url),
    ficha_tecnica: item.fichaTecnica
      ? {
          url: item.fichaTecnica.url,
          title: item.fichaTecnica.title,
        }
      : undefined,
    fabricante: {
      id: item.fabricante.sys.id,
      nombre: item.fabricante.nombre,
    },
  };
}

// GraphQL helper function
async function graphqlRequest(query: string, variables?: Record<string, any>) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  return data;
}

// GraphQL-based functions
export async function getFabricantes(): Promise<Distributor[]> {
  try {
    const response = await graphqlRequest(FABRICANTES_QUERY);
    const fabricantes = response.data.fabricanteCollection
      .items as FabricanteGraphQLResponse[];
    return fabricantes.map(parseDistributorFromGraphQL);
  } catch (error) {
    console.error("Error fetching fabricantes:", error);
    return [];
  }
}

export async function getProductosByFabricante(
  fabricanteId: string
): Promise<Producto[]> {
  try {
    const response = await graphqlRequest(PRODUCTOS_BY_FABRICANTE_QUERY, {
      fabricanteId,
    });
    const productos = response.data.productoCollection
      .items as ProductoGraphQLResponse[];
    return productos.map(parseProductoFromGraphQL);
  } catch (error) {
    console.error("Error fetching productos by fabricante:", error);
    return [];
  }
}

export async function getFabricanteBySlug(
  slug: string
): Promise<Fabricante | null> {
  try {
    const response = await graphqlRequest(FABRICANTE_BY_SLUG_QUERY, { slug });
    const fabricantes = response.data.fabricanteCollection
      .items as FabricanteCompleteGraphQLResponse[];

    if (fabricantes.length === 0) {
      return null;
    }

    const fabricante = parseFabricanteFromGraphQL(fabricantes[0]);

    // Fetch products for this fabricante
    const productos = await getProductosByFabricante(fabricante.id);
    return {
      ...fabricante,
      productos,
    };
  } catch (error) {
    console.error("Error fetching fabricante by slug:", error);
    return null;
  }
}

export async function getAllFabricanteSlugs(): Promise<string[]> {
  try {
    const response = await graphqlRequest(FABRICANTE_SLUGS_QUERY);
    const fabricantes = response.data.fabricanteCollection.items as {
      sys: { id: string };
    }[];
    return fabricantes.map((item) => item.sys.id);
  } catch (error) {
    console.error("Error fetching fabricante slugs:", error);
    return [];
  }
}

export async function getProductoBySlug(
  slug: string
): Promise<ProductoCompleto | null> {
  try {
    const response = await graphqlRequest(PRODUCTO_BY_SLUG_QUERY, { slug });
    const productos = response.data.productoCollection
      .items as ProductoCompleteGraphQLResponse[];

    if (productos.length === 0) {
      return null;
    }

    return parseProductoCompletoFromGraphQL(productos[0]);
  } catch (error) {
    console.error("Error fetching producto by slug:", error);
    return null;
  }
}

export async function getAllProductoSlugs(): Promise<string[]> {
  try {
    const response = await graphqlRequest(PRODUCTO_SLUGS_QUERY);
    const productos = response.data.productoCollection.items as {
      sys: { id: string };
    }[];
    return productos.map((item) => item.sys.id);
  } catch (error) {
    console.error("Error fetching producto slugs:", error);
    return [];
  }
}

export async function getProductosPrincipales(): Promise<Producto[]> {
  try {
    const response = await graphqlRequest(PRODUCTOS_PRINCIPALES_QUERY);
    const productos = response.data.productoCollection
      .items as ProductoGraphQLResponse[];
    return productos.map(parseProductoFromGraphQL);
  } catch (error) {
    console.error("Error fetching productos principales:", error);
    return [];
  }
}
