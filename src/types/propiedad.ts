export interface Imagen {
    id: string;
    url: string;
}

export interface Propiedad {
    id: string;
    descripcion: string;
    precio: number;
    area: number;
    habitaciones: number;
    banos: number;
    garage: number;
    longitud: number;
    tipoPropiedad: string;
    estadoPropiedad: string;
    direccion: string;
    pais: string;
    departamento:string
    provincia: string;
    distrito: string;
    imgenPrincipla: string | null; // Puede ser null según tu JSON de ejemplo
    imagenes: Imagen[] | null; // Puede ser null según tu JSON de ejemplo
    createdAt: string;
}