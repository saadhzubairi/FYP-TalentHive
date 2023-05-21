import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ApplicationsGrid from '../ApplicationsGrid/ApplicationsGrid';
import "./tabBar.css"

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, padding: "0em" }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="New" {...a11yProps(0)} sx={{ fontWeight: "900", fontSize: "1.2em" }} />
                    <Tab label="Shortlisted" {...a11yProps(1)} sx={{ fontWeight: "900", fontSize: "1.2em" }} />
                    <Tab label="Reviewed" {...a11yProps(2)} sx={{ fontWeight: "900", fontSize: "1.2em" }} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ApplicationsGrid interview={false} newApps={true} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ApplicationsGrid interview={true} newApps={false} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ApplicationsGrid interview={false} newApps={false} />
            </TabPanel>
        </Box>
    );
}
