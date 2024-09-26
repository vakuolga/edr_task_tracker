import React from "react";
import CreateTicket from "./createTicket";

interface TicketModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // If the modal is closed, do not render anything

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Create a New Ticket</h2>
                <CreateTicket />
            </div>
        </div>
    );
};

export default TicketModal;
