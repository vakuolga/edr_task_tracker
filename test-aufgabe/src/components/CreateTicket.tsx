import React, { useState } from "react";

const CreateTicket = () => {
    const [data, setData] = useState({
        title: '',
        desc: '',
        type: '',
        status: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setError(null);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Validating fields
        if (!data.title || !data.desc || !data.type || !data.status) {
            setError("Все поля должны быть заполнены");
            return;
        }

        try {
            const response = await fetch('https://mockapi.example.com/tickets', { // mock api
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке данных');
            }

            const result = await response.json();
            console.log('Тикет успешно создан:', result);
            setSuccessMessage("Тикет успешно создан!");
            setData({ title: '', desc: '', type: '', status: '' });
        } catch (error) {
            console.error('Ошибка:', error);
            setError('Не удалось создать тикет. Попробуйте еще раз.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                id="title" 
                name="title" 
                value={data.title} 
                onChange={handleChange} 
                placeholder="Title" 
            />
            <input 
                type="text" 
                id="desc" 
                name="desc" 
                value={data.desc} 
                onChange={handleChange} 
                placeholder="Description" 
            />
            <input 
                type="text" 
                id="type" 
                name="type" 
                value={data.type} 
                onChange={handleChange} 
                placeholder="Type" 
            />
            <input 
                type="text" 
                id="status" 
                name="status" 
                value={data.status} 
                onChange={handleChange} 
                placeholder="Status" 
            />
            <button type="submit">Создать тикет</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </form>
    );
};

export default CreateTicket;
