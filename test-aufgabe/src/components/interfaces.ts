export interface Ticket {
    id: number;
    status?: 'open' | 'in-progress' | 'closed';
    title: string;
    desc: string;
    type: number;
}

export interface Type {
    id: number;
    text: string;
}

export interface TicketWrapperProps {
    data: Ticket;
}
