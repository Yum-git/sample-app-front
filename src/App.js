import Paper from '@material-ui/core/Paper';
import {EditingState, IntegratedEditing, ViewState} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    Toolbar,
    MonthView,
    DateNavigator,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    TodayButton,
    ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';
import {useState} from "react";

const now = new Date();
const currentDate = now;

const App = () => {
    const [data, setData] = useState([
        {
            startDate: '2022-01-06T09:45',
            endDate: '2022-01-06T10:45',
            title: 'テスト予定',
            notes: 'aaaa',
            id: 0
        }
    ]);

    const commitChanges = ({added, changed, deleted}) => {
        if(added){
            let new_id = 0;
            if(data.length > 0){
                new_id = data[data.length - 1].id + 1;
            };

            setData(
                [...data, {id: new_id, ...added}]
            );
        }

        if(changed){
            const change_data = data.map(appointment => (
                    changed[appointment.id] ? {...appointment, ...changed[appointment.id]} : appointment
                )
            );

            setData(change_data);
        }

        if(deleted){
            const delete_data = data.filter(appointment => appointment.id !== deleted);

            setData(delete_data);
        }
    };

    return (
        <Paper>
            <Scheduler
                data={data}
            >
                <ViewState
                    currentDate={currentDate}
                />
                <EditingState
                    onCommitChanges={commitChanges}
                />
                <IntegratedEditing />
                <MonthView />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <ConfirmationDialog />
                <Appointments />
                <AppointmentTooltip
                    showOpenButton
                    showDeleteButton
                />
                <AppointmentForm />
            </Scheduler>
        </Paper>
    );
}

export default App;
