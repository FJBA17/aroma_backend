# Aroma Backend - API GraphQL

Backend para catálogo de vinos construido con NestJS + GraphQL + PostgreSQL.

## 🚀 Tecnologías

- **NestJS** - Framework Node.js
- **GraphQL** - API
- **TypeORM** - ORM
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **Class Validator** - Validación de datos

## 📋 Prerequisitos

- Node.js (v18+)
- PostgreSQL (v14+)
- Bruno (para testing de API)

## 🔧 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar base de datos PostgreSQL:
   - Usuario: `postgres`
   - Password: `1234`
   - Database: `aroma_data`
   - Host: `localhost`

3. Las variables de entorno ya están configuradas en `.env`

## 🏃 Ejecutar la aplicación

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

El servidor estará disponible en: `http://localhost:3000/graphql`

## 👤 Usuario por Defecto

Al iniciar la aplicación, se crea automáticamente un administrador por defecto:

- **Email**: admin@aroma.cl
- **Password**: aroma1234

## 📚 Estructura del Proyecto

```
src/
├── entities/           # Entidades TypeORM
│   ├── admin.entity.ts
│   └── vino.entity.ts
├── modules/
│   ├── auth/          # Autenticación JWT
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.resolver.ts
│   │   ├── guards/
│   │   ├── strategies/
│   │   └── decorators/
│   ├── admin/         # Gestión de administradores
│   │   ├── admin.module.ts
│   │   ├── admin.service.ts
│   │   ├── admin.resolver.ts
│   │   └── dto/
│   └── vinos/         # Gestión de vinos
│       ├── vinos.module.ts
│       ├── vinos.service.ts
│       ├── vinos.resolver.ts
│       └── dto/
├── app.module.ts
└── main.ts
```

## 🔐 Autenticación

### Login

```graphql
mutation Login {
  login(loginInput: {
    email: "admin@aroma.cl"
    password: "aroma1234"
  }) {
    accessToken
    admin {
      id
      email
    }
  }
}
```

El token debe incluirse en el header `Authorization: Bearer <token>` para las requests protegidas.

### Obtener usuario actual

```graphql
query Me {
  me {
    id
    email
    isActive
  }
}
```

## 📦 API - Endpoints GraphQL

### Administradores (Protegido)

- `admins` - Listar todos los administradores
- `admin(id)` - Obtener un administrador por ID
- `createAdmin(createAdminInput)` - Crear nuevo administrador
- `updateAdmin(id, updateAdminInput)` - Actualizar administrador
- `removeAdmin(id)` - Eliminar administrador

### Vinos

**Público:**
- `vinos` - Listar vinos activos (sin autenticación)
- `vino(id)` - Obtener un vino por ID (sin autenticación)

**Protegido (requiere autenticación):**
- `vinosAdmin(includeInactive)` - Listar todos los vinos
- `createVino(createVinoInput)` - Crear nuevo vino
- `updateVino(id, updateVinoInput)` - Actualizar vino
- `toggleVinoActive(id)` - Activar/desactivar vino
- `updateVinoStock(id, cantidad)` - Actualizar stock
- `removeVino(id)` - Eliminar vino

## 🧪 Testing con Bruno

La colección completa de Bruno está disponible en `../aroma_bruno/`

### Uso:

1. Abrir Bruno y cargar la colección desde `aroma_bruno/`
2. Asegurarse de usar el environment "Local"
3. Ejecutar "Login" primero - el token se guardará automáticamente
4. Las demás requests usarán el token automáticamente

### Estructura de Bruno:

```
aroma_bruno/
├── Auth/
│   ├── Login.bru          # Login y obtención de token
│   └── Me.bru             # Obtener usuario actual
├── Admins/                # CRUD de administradores
│   ├── GetAllAdmins.bru
│   ├── GetAdminById.bru
│   ├── CreateAdmin.bru
│   ├── UpdateAdmin.bru
│   └── DeleteAdmin.bru
└── Vinos/                 # CRUD de vinos
    ├── GetVinos.bru
    ├── GetVinosAdmin.bru
    ├── GetVinoById.bru
    ├── CreateVino.bru
    ├── UpdateVino.bru
    ├── ToggleVinoActive.bru
    ├── UpdateVinoStock.bru
    └── DeleteVino.bru
```

## 📝 Entidades

### Admin
- id (UUID)
- email (único)
- password (hasheado)
- isActive (boolean)
- createdAt
- updatedAt

### Vino
- id (UUID)
- nombre
- precio (decimal)
- precioMercado (decimal, opcional)
- foto (string, opcional)
- descripcion (text)
- stock (integer)
- isActive (boolean)
- createdAt
- updatedAt

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación JWT
- Guards de GraphQL para rutas protegidas
- Validación de datos con class-validator
- CORS habilitado

## 📌 Notas

- `synchronize: true` en TypeORM está activado para desarrollo. **Desactivar en producción**.
- Las imágenes de vinos deben subirse a un servicio externo (como Cloudinary, AWS S3, etc.)
- El campo `foto` almacena la URL de la imagen
