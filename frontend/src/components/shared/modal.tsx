import { Link } from "react-router-dom"
import type { ModalProps } from "../../types"
import Button from "../ui/button"
import { useModalStore } from "../../stores/modal.store";

const Modal = ({ title, description, action, link }: ModalProps) => {
    const { isOpen, close } = useModalStore();

    return (
        <div className={`${isOpen ? 'fixed' : 'hidden'} inset-0 z-50 flex items-center justify-center bg-black/40 p-4`}>
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-gray">{description}</p>

                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" onClick={close}>Bekor qilish</Button>
                    {action && <Button variant="danger" onClick={action}>Davom etish</Button>}
                    {link && (
                        <Link to={link}>
                            <Button variant="danger">Davom etish</Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;