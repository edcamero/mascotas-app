import { differenceInCalendarMonths } from "date-fns"


const UsePets = () => {
    const getSexo = (pet) => {
        return pet?.sexo === "F" ? "Hembra" : "macho";
    }
    const getAge = (pet) => {
        return differenceInCalendarMonths(new Date(), new Date(pet.fecha_nacimiento));
    }
    const getEsterilizado = (pet) => {
        return pet?.esterilizado ? "Si" : "No";
    }
    
    return { getSexo, getAge, getEsterilizado }
}

export default UsePets