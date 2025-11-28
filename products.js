// Datos de productos para Los Rockeritos
const products = [
    { 
        id: 1, 
        name: "Pupusa de Queso", 
        description: "Deliciosa pupusa rellena de queso derretido", 
        price: 1.50, 
        category: "Pupusas", 
        icon: "🥟",
        stock: 20
    },
    { 
        id: 2, 
        name: "Pupusa Revuelta", 
        description: "Pupusa con queso, frijol y chicharrón", 
        price: 1.75, 
        category: "Pupusas", 
        icon: "🥟",
        stock: 15
    },
    { 
        id: 3, 
        name: "Licuado de Fresa", 
        description: "Refrescante licuado de fresa natural con leche", 
        price: 2.50, 
        category: "Licuados", 
        icon: "🥤",
        stock: 10
    },
    { 
        id: 4, 
        name: "Almuerzo Típico", 
        description: "Plato típico con casamiento, carne asada y ensalada", 
        price: 6.00, 
        category: "Almuerzos", 
        icon: "🍛",
        stock: 8
    },
    { 
        id: 5, 
        name: "Pan Dulce", 
        description: "Selección de panes dulces tradicionales", 
        price: 1.00, 
        category: "Panadería", 
        icon: "🍞",
        stock: 25
    },
    { 
        id: 6, 
        name: "Café Americano", 
        description: "Café negro recién preparado", 
        price: 1.50, 
        category: "Bebidas Calientes", 
        icon: "☕",
        stock: 30
    },
    { 
        id: 7, 
        name: "Horchata", 
        description: "Bebida refrescante de arroz y canela", 
        price: 2.00, 
        category: "Bebidas Frías", 
        icon: "🥛",
        stock: 12
    },
    { 
        id: 8, 
        name: "Tamales de Elote", 
        description: "Tamales de elote recién hechos", 
        price: 2.50, 
        category: "Especialidades", 
        icon: "🌽",
        stock: 10
    }
];

// Usuarios predefinidos para el sistema
const users = [
    {
        username: "admin",
        password: "admin123",
        role: "administrador",
        name: "Administrador Principal"
    },
    {
        username: "comprador",
        password: "comprador123",
        role: "comprador",
        name: "Cliente Regular"
    },
    {
        username: "maria",
        password: "maria123",
        role: "comprador",
        name: "María González"
    }
];
