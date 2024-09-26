import React from "react";
import { Ticket } from "./interfaces";

interface TicketWrapperProps {
    data: Ticket;
    onClick: () => void;
    isSelected: boolean;
}

const TicketWrapper: React.FC<TicketWrapperProps> = ({ data, onClick, isSelected }) => {
    return (
        <div
            className={`ticket-item ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <p>{data.id}</p>
            <p>{data.title}</p>
            <p>{data.desc}</p>
            <p>{data.type}</p>
            <p>{data.status}</p>
        </div>
    );
};

export default TicketWrapper;
