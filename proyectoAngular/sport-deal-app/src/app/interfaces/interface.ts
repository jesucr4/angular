export interface DatosConJwt {
    jwt: string;
} 

export interface instalacion{
    id: number;
    nombre: string;
    capacidad: number;
    localidad: string;
    idInstalacion: modalidad;
    fecha_Construccion: string;
    imagen: string;
}

export interface modalidad {
    id: number;
    descripcion: string;
}

export interface ListadoInstalaciones {
    instalaciones: instalacion[];
    instalacionesTotal: number; 
}

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    password: string;
    imagen: string;
}