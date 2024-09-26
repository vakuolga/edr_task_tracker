import React, { useEffect, useState, useMemo } from "react";
import useDebounce from "../hooks/useDebounce";
import TicketWrapper from "./TicketWrapper";
import TicketDetails from "./TicketDetails";
import TicketModal from "./TicketModal";
import { Ticket, Type } from "./interfaces";
import { getMockTicketsData, getMockTicketsTypesData } from "../utils/fetchData";

const List = () => {
    const [tickets, setTickets] = useState<(Ticket & { typeText?: string })[]>([]);
    const [typesData, setTypesData] = useState<Type[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filters
    const [selectedType, setSelectedType] = useState<number | 'all'>('all');
    const [selectedStatus, setSelectedStatus] = useState<string | 'all'>('all');

    // Debounce for filters
    const debouncedType = useDebounce(selectedType, 500);
    const debouncedStatus = useDebounce(selectedStatus, 500);

    // Effect for fetching tickets
    useEffect(() => {
        const timer = setTimeout(() => {
            const newTickets = getMockTicketsData();
            const newTypesData = getMockTicketsTypesData();

            const ticketsWithTypes = newTickets.map(ticket => {
                const typeInfo = newTypesData.find(type => type.id === ticket.type);
                return { ...ticket, typeText: typeInfo ? typeInfo.text : "Unknown" };
            });

            setTickets(ticketsWithTypes);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Effect for fetching ticket types
    useEffect(() => {
        const timer = setTimeout(() => {
            const newTypesData = getMockTicketsTypesData();
            setTypesData(newTypesData);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Filtering tickets
    const filteredTickets = useMemo(() => {
        return tickets.filter(ticket => {
            const matchesType = debouncedType === 'all' || ticket.type === debouncedType;
            const matchesStatus = debouncedStatus === 'all' || ticket.status === debouncedStatus;
            return matchesType && matchesStatus;
        });
    }, [tickets, debouncedType, debouncedStatus]);

    // Function to update ticket status
    const updateTicketStatus = async (ticketId: number, newStatus: 'open' | 'in-progress' | 'closed') => {
        // Logic to update ticket status
        setTickets(prevTickets => {
            return prevTickets.map(ticket => 
                ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
            );
        });

        if (selectedTicket?.id === ticketId) {
            setSelectedTicket(prev => prev ? { ...prev, status: newStatus } : null);
        }
    };

    const handleTicketClick = (ticket: Ticket & { typeText?: string }) => {
        setSelectedTicket(prev => (prev?.id === ticket.id ? null : ticket));
    };

    return (
        <div className="ticket-list">
            {/* Button to open the modal */}
            <button onClick={() => setIsModalOpen(true)}>Create Ticket</button>
            
            {/* Modal */}
            <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Filtering by type */}
            <div>
                <label>Filter by type:</label>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}>
                    <option value="all">All types</option>
                    {typesData.map(type => (
                        <option key={type.id} value={type.id}>{type.text}</option>
                    ))}
                </select>
            </div>

            {/* Filtering by status */}
            <div>
                <label>Filter by status:</label>
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                    <option value="all">All statuses</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="in-progress">In Progress</option>
                </select>
            </div>

            {/* Ticket list */}
            <div className="ticket-wrapper">
                {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                        <TicketWrapper
                            key={ticket.id}
                            data={ticket}
                            isSelected={selectedTicket?.id === ticket.id}
                            onClick={() => handleTicketClick(ticket)}
                        />
                    ))
                ) : (
                    <p>No tickets found matching the filters.</p>
                )}
            </div>

            {/* Details of the selected ticket */}
            <TicketDetails ticket={selectedTicket} onUpdateStatus={updateTicketStatus} />
        </div>
    );
};

export default List;
