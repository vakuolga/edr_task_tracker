import React from 'react';
import { Ticket } from "./interfaces";

interface TicketDetailsProps {
    ticket: Ticket | null;
    onUpdateStatus: (ticketId: number, newStatus: 'open' | 'in-progress' | 'closed') => void;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, onUpdateStatus }) => {
    if (!ticket) {
        return <p>Select a ticket to view details.</p>;
    }

    const handleStatusChange = (newStatus: 'open' | 'in-progress' | 'closed') => {
        onUpdateStatus(ticket.id, newStatus);
    };

    return (
        <div className="ticket-details">
            <h2>Ticket Details</h2>
            <p><strong>ID:</strong> {ticket.id}</p>
            <p><strong>Title:</strong> {ticket.title}</p>
            <p><strong>Description:</strong> {ticket.desc}</p>
            <p><strong>Type:</strong> {ticket.type}</p>
            <p><strong>Status:</strong> {ticket.status || "Not specified"}</p>

            {/* Buttons for changing ticket status */}
            <div>
                <button onClick={() => handleStatusChange('open')}>Open</button>
                <button onClick={() => handleStatusChange('in-progress')}>In Progress</button>
                <button onClick={() => handleStatusChange('closed')}>Closed</button>
            </div>
        </div>
    );
};

export default TicketDetails;
