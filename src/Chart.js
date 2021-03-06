import React from "react";
import { Line } from 'react-chartjs-2';


const Chart = ({temp, labels}) => {
	const data = {
		labels: labels,
		datasets: [{
			label: 'Weather',
			data: temp,
			fill: false,
			backgroundColor: [
				'rgba(240,221,225,0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)',
			],
			borderColor: [
				'rgb(240,216,220)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)',
			],
		}]
	};
	return(
		<>
			<div className={"chart"}>
				<Line data={data} />
			</div>
		</>
	);
};



export default Chart
