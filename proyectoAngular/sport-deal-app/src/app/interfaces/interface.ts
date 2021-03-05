export interface DatosConJwt {
    jwt: string;
} 

export interface instalacion{
    id: number;
    nombre: string;
    imagen: string;
    capacidad: number;
    localidad: string;
    fecha_Construccion: Date;
    idModalidad: modalidad;
}

export interface competicion{
    id: number;
    nombre: string;
    modalidad: number;
    idInstalacion: number;
}

export interface modalidad {
    id: number;
    descripcion: string;
}

export interface ListadoInstalaciones {
    instalaciones: instalacion[];
    instalacionesTotal: number; 
}

export interface ListadoCompeticiones {
    competiciones: competicion[];
}

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    password: string;
    imagen: string;
}