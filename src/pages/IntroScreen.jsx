import React, { useState, useEffect } from 'react';

const SentenceFader = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div
            className={`
                transition-all text-base sm:text-xl duration-1000 ease-in-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                mb-2 sm:mb-4 text-white
            `}
        >
            {children}
        </div>
    );
};

const IntroScreen = ({ onIntroContinue }) => {
    return (
        <div className="flex items-center flex-col justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <h2 className='text-white text-center mb-2 text-sm sm:text-base'>USE FULLSCREEN FOR BEST EXPERIENCE! (DON'T USE SAFARI AND PLEASE LOWER VOLUME TO 30%)</h2>
            <div className="bg-gray-800 p-4 sm:p-8 rounded-lg shadow-lg max-w-4xl w-full overflow-y-auto max-h-[90vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
                    <div className="overflow-y-auto max-h-[60vh] sm:max-h-none pr-2">
                        <SentenceFader delay={0}>
                            You are an aspiring web developer...
                        </SentenceFader>
                        <SentenceFader delay={2500}>
                            You've watched HOURS of web dev simplified...
                        </SentenceFader>
                        <SentenceFader delay={5000}>
                            Yet you fall short on just one thing...
                        </SentenceFader>
                        <SentenceFader delay={8500}>
                            YOU STILL CANNOT CENTER A DIV!!!
                        </SentenceFader>
                        <SentenceFader delay={12000}>
                            You see a new job posting for the tech company of your dreams
                        </SentenceFader>

                        <SentenceFader delay={15000}>
                            In the first line of the requirements... you gasp as you see "Must be proficient at centering divs"
                        </SentenceFader>
                        <SentenceFader delay={20000}>
                            Determined to land this job at all costs, but you're too brainrotted to study css...
                        </SentenceFader>
                        <SentenceFader delay={24500}>
                            Which brings you here...
                        </SentenceFader>
                        <SentenceFader delay={28000}>
                            Center the blocks which form the brain rot clips on the screen and master the art of centering divs!!!
                        </SentenceFader>
                    </div>
                    <div className="hidden sm:block">
                        <SentenceFader delay={13000}>
                            <img 
                                className='h-full w-full object-contain' 
                                src="https://cdn.discordapp.com/attachments/1311482389587034132/1312645096377811044/image.png?ex=674de842&is=674c96c2&hm=2b7ea7fc072f9728449333bfe0517c66c0e79e642c07aac3e24525865ac6c652&" 
                                alt="Intro graphic"
                            />
                        </SentenceFader>
                    </div>
                </div>
                <div className="mt-4 sm:mt-8 text-center">
                    <SentenceFader delay={32000}>
                        <button
                            onClick={onIntroContinue}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Start Game
                        </button>
                    </SentenceFader>
                </div>
            </div>
        </div>
    );
};

export default IntroScreen;