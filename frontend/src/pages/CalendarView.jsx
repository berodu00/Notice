import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getNotices } from '../api';

const localizer = momentLocalizer(moment);

export default function CalendarView() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const notices = await getNotices();

            // Transform notices into calendar events
            const calendarEvents = notices
                .filter(n => n.schedule && n.schedule.startTime) // Only items with schedule
                .map(n => ({
                    id: n.id,
                    title: n.title,
                    start: new Date(n.schedule.startTime),
                    end: new Date(n.schedule.endTime || n.schedule.startTime), // Fallback to start if end missing
                    resource: n,
                    // Color coding logic
                    status: n.status
                }));

            setEvents(calendarEvents);
        } catch (error) {
            console.error("Failed to load calendar events", error);
        }
    };

    const eventStyleGetter = (event) => {
        let backgroundColor = '#3174ad';
        switch (event.status) {
            case 'APPROVED': backgroundColor = '#28a745'; break;
            case 'PENDING': backgroundColor = '#ffc107'; break;
            case 'REJECTED': backgroundColor = '#dc3545'; break;
            case 'COMPLETED': backgroundColor = '#6c757d'; break;
            default: backgroundColor = '#007bff';
        }

        return {
            style: {
                backgroundColor,
                borderRadius: '5px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block'
            }
        };
    };

    return (
        <div style={{ height: '80vh', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Notice Calendar</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                eventPropGetter={eventStyleGetter}
            />
        </div>
    );
}
