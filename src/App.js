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
import axios from "axios";

const api_url = "http://localhost:8000/plan";

const now = new Date();
const currentDate = now;

const App = () => {
    const [data, setData] = useState([
        { startDate: '2010-01-01T09:45', endDate: '2010-01-01T11:00', title: 'Don`t Delete!!', id: 0 },
    ]);

    const commitChanges = async ({added, changed, deleted}) => {
        if(added){
            await planAdd(added);
        }

        if(changed){
            let change_data = changed[Object.keys(changed)[0]];
            change_data.id = Number(Object.keys(changed)[0]);

            await planChange(change_data);
        }

        if(deleted){
            await planDelete(deleted);
        }

        planRead();
    };

    const planAdd = (added) => {
        axios.post(api_url, {
            start_date: added.startDate,
            end_date: added.endDate,
            title: added.title,
            notes: added.notes
        }).then(
            res => {
                console.log(res);
            }
        ).catch(
            err => {
                console.error(err);
            }
        );
    }

    const planChange = (changed) => {
        axios.put(api_url, {
            id: changed.id,
            start_date: changed.startDate,
            end_date: changed.endDate,
            title: changed.title,
            notes:  changed.notes
        }).then(
            res => {
                console.log(res);
            }
        ).catch(
            err => {
                console.error(err);
            }
        )
    }

    const planDelete = (deleted) => {
        axios.delete(api_url, {
            data: {
                id: deleted
            }
        }).then(
            res => {
                console.log(res);
            }
        ).catch(
            err => {
                console.error(err);
            }
        )
    }

    const planRead = () => {
        axios.get(api_url
        ).then(
            res => {
                setData(res.data.results)
            }
        ).catch(
            err => {
                console.error(err);
            }
        )
    }



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
