import Swal from 'sweetalert2'

const successAlert = (title)=>{
       console.log("✅ Showing success alert:", title);
    const alert = Swal.fire({
        icon : "success",
        title: title,
        confirmButtonColor : "#00b050"
    });

    return alert
}

export default successAlert