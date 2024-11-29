import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';

function BarChartDashBoard({ budgets }: any) {
    return (
        <div>
            <BarChart
                width={500}
                height={500}
                data={budgets}
                margin={{
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5
                }}
            >
                <XAxis dataKey={'name'} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={'totalSpend'} stackId={'a'} color='#4845d2' />
                <Bar dataKey={'amount'} stackId={'a'} color='#C3CFF' />
            </BarChart>
        </div>
    )
}

export default BarChartDashBoard;