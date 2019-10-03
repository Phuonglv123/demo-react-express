import Swal from "sweetalert2";

class ToastNotify {
    MyToast(type, title, position) {
        const Toast = Swal.mixin({
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: 3000
        });
        return (
            Toast.fire({
                type: type,
                title: title,
            })
        )
    }
}

export default new ToastNotify();
