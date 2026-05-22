// seed-vinos.mjs
// Ejecutar: node seed-vinos.mjs
// Requiere que el backend esté corriendo en http://localhost:3000

const API_URL = 'http://localhost:3000/graphql'
const EMAIL = 'admin@aroma.cl'
const PASSWORD = 'aroma1234'

// ─── 20 vinos ficticios con precios realistas en CLP ───────────────────────
const vinos = [
  {
    nombre: 'Concha y Toro Casillero del Diablo Cabernet Sauvignon',
    precio: 5990,
    precioMercado: 7490,
    descripcion: 'Clásico chileno con aromas a frutos negros, moras y un toque de vainilla. Taninos suaves y final largo. Ideal para asados y carnes rojas.',
    stock: 48,
    foto: null,
  },
  {
    nombre: 'Santa Rita Medalla Real Gran Reserva Carmenère',
    precio: 12990,
    precioMercado: 15990,
    descripcion: 'Carmenère emblemático con notas de pimienta negra, ciruela y chocolate amargo. Estructura equilibrada y persistencia elegante.',
    stock: 30,
    foto: null,
  },
  {
    nombre: 'Errazuriz Aconcagua Alto Pinot Noir',
    precio: 18500,
    precioMercado: null,
    descripcion: 'Pinot Noir de altura con expresión frutal delicada: cerezas, frambuesas y flores. Acidez vibrante y taninos sedosos.',
    stock: 15,
    foto: null,
  },
  {
    nombre: 'Montes Alpha Cabernet Sauvignon',
    precio: 14990,
    precioMercado: 17500,
    descripcion: 'Ícono de la viticultura chilena. Concentrado, con notas de cassis, menta y cedro. Crianza de 12 meses en roble francés.',
    stock: 25,
    foto: null,
  },
  {
    nombre: 'Clos Apalta Colchagua Valley',
    precio: 89990,
    precioMercado: null,
    descripcion: 'Blend de Carmenère, Cabernet Sauvignon y Merlot. Uno de los mejores vinos de Sudamérica. Complejo, profundo y de largo añejamiento.',
    stock: 6,
    foto: null,
  },
  {
    nombre: 'Undurraga TH Maipo Chardonnay',
    precio: 9490,
    precioMercado: 11990,
    descripcion: 'Chardonnay elegante con notas de durazno, vainilla y mantequilla tostada. Fermentado parcialmente en roble francés.',
    stock: 34,
    foto: null,
  },
  {
    nombre: 'Viña Vik Millahue Blend',
    precio: 74900,
    precioMercado: null,
    descripcion: 'Mezcla premium de valle de Millahue. Aromas de frutos rojos maduros, especias y tabaco negro. Potente pero armonioso.',
    stock: 8,
    foto: null,
  },
  {
    nombre: 'Los Vascos Sauvignon Blanc Colchagua',
    precio: 6490,
    precioMercado: 7990,
    descripcion: 'Sauvignon Blanc fresco y vibrante con notas de pomelo, hierba cortada y frutos cítricos. Perfecto para mariscos.',
    stock: 52,
    foto: null,
  },
  {
    nombre: 'Emiliana Adobe Reserva Merlot',
    precio: 4990,
    precioMercado: null,
    descripcion: 'Vino orgánico con notas de ciruela, chocolate y café. Suave y accesible. Certificación orgánica Ecocert.',
    stock: 60,
    foto: null,
  },
  {
    nombre: 'Almaviva Baron Philippe de Rothschild',
    precio: 119990,
    precioMercado: null,
    descripcion: 'Coproducción entre Concha y Toro y la familia Rothschild. Blend bordelés de excepción, complejo y de larga guarda. Colección limitada.',
    stock: 4,
    foto: null,
  },
  {
    nombre: 'Tabalí Reserva Especial Syrah',
    precio: 11990,
    precioMercado: 13990,
    descripcion: 'Syrah del Valle de Limarí con notas de pimienta blanca, violetas y frutos azules. Frescura mineral característica de la zona costera.',
    stock: 20,
    foto: null,
  },
  {
    nombre: 'De Martino Gallardia País',
    precio: 8490,
    precioMercado: null,
    descripcion: 'Rescate de la cepa histórica País. Granate brillante, ligero y fresco con aromas a frutas rojas silvestres y flores secas.',
    stock: 28,
    foto: null,
  },
  {
    nombre: 'Veramonte Ritual Casablanca Pinot Noir',
    precio: 15900,
    precioMercado: 18500,
    descripcion: 'Pinot Noir de Casablanca con influencia oceánica. Perfil frutal fino, acidez refrescante y taninos elegantes.',
    stock: 18,
    foto: null,
  },
  {
    nombre: 'Bisquertt Casa La Joya Reserva Rosé',
    precio: 5490,
    precioMercado: 6490,
    descripcion: 'Rosado seco de Cabernet Sauvignon con color salmón intenso. Notas de frutillas, sandía y un finish limpio y refrescante.',
    stock: 40,
    foto: null,
  },
  {
    nombre: 'Morandé Gran Reserva Late Harvest Gewürztraminer',
    precio: 13490,
    precioMercado: null,
    descripcion: 'Vendimia tardía del Valle de Casablanca. Dulce y aromático con notas de lichi, rosas y miel. Excepcional con quesos azules.',
    stock: 12,
    foto: null,
  },
  {
    nombre: 'Caliterra Tributo Single Vineyard Carmenère',
    precio: 21900,
    precioMercado: 25990,
    descripcion: 'Carmenère de viñedo único en Colchagua. Intenso y especiado, con notas de pimiento rojo asado, mora y grafito. Gran expresión varietal.',
    stock: 14,
    foto: null,
  },
  {
    nombre: 'Viñedos Orgánicos Emiliana Coyam Blend',
    precio: 28900,
    precioMercado: null,
    descripcion: 'Blend biodinámico con Syrah, Carmenère, Merlot y Mourvèdre. Terroso, profundo y de gran complejidad. Certificación biodinámica Demeter.',
    stock: 10,
    foto: null,
  },
  {
    nombre: 'Santa Carolina Reserva de Familia Chardonnay',
    precio: 7990,
    precioMercado: 9490,
    descripcion: 'Chardonnay del Valle de Casablanca con notas de durazno blanco, manzana verde y tostados de barrica. Elegante y equilibrado.',
    stock: 35,
    foto: null,
  },
  {
    nombre: 'Lapostolle Grand Selection Cabernet Sauvignon',
    precio: 9990,
    precioMercado: 12490,
    descripcion: 'Cabernet Sauvignon de Colchagua con carácter frutal generoso, notas de moras, especias dulces y un final aterciopelado.',
    stock: 0,
    foto: null,
  },
  {
    nombre: 'Viña Leyda Lot 21 Single Vineyard Sauvignon Blanc',
    precio: 17900,
    precioMercado: null,
    descripcion: 'Sauvignon Blanc de viñedo costero en San Antonio. Herbáceo, mineral y con notas de maracuyá. Frescura excepcional. Guarda 2–4 años.',
    stock: 22,
    foto: null,
  },
]

// ─── Helpers GraphQL ────────────────────────────────────────────────────────
async function gql(query, variables = {}, token = null) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  if (json.errors) throw new Error(json.errors[0].message)
  return json.data
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔑 Autenticando...')
  const loginData = await gql(`
    mutation Login($email: String!, $password: String!) {
      login(loginInput: { email: $email, password: $password }) {
        accessToken
      }
    }
  `, { email: EMAIL, password: PASSWORD })

  const token = loginData.login.accessToken
  console.log('✅ Token obtenido\n')

  let ok = 0
  let fail = 0

  for (const vino of vinos) {
    try {
      await gql(`
        mutation CreateVino($input: CreateVinoInput!) {
          createVino(createVinoInput: $input) {
            id
            nombre
          }
        }
      `, { input: vino }, token)

      console.log(`  ✓ ${vino.nombre}`)
      ok++
    } catch (err) {
      console.error(`  ✗ ${vino.nombre} — ${err.message}`)
      fail++
    }
  }

  console.log(`\n🍷 Seed completado: ${ok} creados, ${fail} errores.`)
}

main().catch((err) => {
  console.error('Error fatal:', err.message)
  process.exit(1)
})
