import React from 'react';
import { subscriber } from '../store';
import '../tailwind.output.css';

export default class Stats extends React.Component {

    constructor() {
        super();

        this.state = {
            stats: {
                total: 0,
                correct: 0,
                error: 0,
                score: 0
            }
        }
    }

    componentDidMount() {
        subscriber.subscribe((value) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    stats: {
                        ...prevState.stats,
                        ...value
                    }
                }
            })
        });
    }

    render() {
        const { stats } = this.state;
        return (
            <div className="row sm:flex my-4">
                <div className="col">
                    <div className="flex flex-col">
                        <div className="row sm:flex">
                            <div className="col">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg w-64">
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-wrap">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-gray-500 uppercase font-bold text-xs">
                                                    Total no. of words
                                                </h5>
                                                <span className="font-semibold text-xl text-gray-800">
                                                    {stats.total}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col ml-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg w-64">
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-wrap">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-gray-500 uppercase font-bold text-green-400 text-xs">
                                                    Correct words
                                                </h5>
                                                <span className="font-semibold text-xl text-gray-800">
                                                    {stats.correct}&nbsp;
                                                    <span className="font-semibold text-md text-gray-400">
                                                        / {stats.correct + stats.error}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col ml-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg w-64">
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-wrap">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-gray-500 uppercase text-red-400 font-bold text-xs">
                                                    Wrong words
                                                </h5>
                                                <span className="font-semibold text-xl text-gray-800">
                                                    {stats.error}&nbsp;
                                                    <span className="font-semibold text-md text-gray-400">
                                                        / {stats.correct + stats.error}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col ml-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg w-64">
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-wrap">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-gray-500 uppercase font-bold text-xs">
                                                    Score
                                                </h5>
                                                <span className="font-semibold text-xl text-gray-800">
                                                    {stats.score}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 