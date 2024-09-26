import { Ticket, Type } from "../components/interfaces";

export const getMockTicketsData = (): Ticket[] => {
    const tickets: Ticket[] = [
        { id: 1, title: 'Epic1', desc: 'Performance improvements', type: 0, status: 'open' },
        { id: 2, title: 'Bug1', desc: 'Nothing works', type: 2, status: 'in-progress' },
        { id: 3, title: 'Story1', desc: 'Tree refactoring', type: 1, status: 'closed' },
        { id: 4, title: 'Story2', desc: 'List refactoring', type: 1, status: 'open' },
        { id: 5, title: 'Bug2', desc: 'Selection in list does not work', type: 2, status: 'open' },
        { id: 6, title: 'Bug3', desc: 'Tree cannot be expanded', type: 2, status: 'in-progress' },
        { id: 7, title: 'Epic2', desc: 'Offline functionality', type: 0, status: 'closed' },
        { id: 8, title: 'Epic3', desc: 'Data caching', type: 0, status: 'open' },
    ];
    return tickets;
};

export const getMockTicketsTypesData = (): Type[] => {
    const types: Type[] = [
        { id: 0, text: 'Epic' },
        { id: 1, text: 'Story' },
        { id: 2, text: 'Bug' }
    ];
    return types;
};
