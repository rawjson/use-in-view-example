'use client'

import {
    useInView,
    InViewProvider,
    ObserveZone,
    Target
} from '@nav/use-in-view'
import clsx from 'clsx'

const targetIds = [
    'section#1',
    'section#2',
    'section#3',
    'section#4',
    'section#5'
]
export default function Example() {
    return (
        <InViewProvider targetIds={targetIds}>
            <div className='h-screen w-full'>
                <div className='max-w-7xl mx-auto w-full p-10 flex gap-10'>
                    <Navigation />
                    {/* must use position:relative in parent for ObserveZone to work */}
                    <div className='relative w-full space-y-5'>
                        {/* invisible component to track the target in view */}
                        <ObserveZone
                            // optional height property, default is 50vh
                            height='70vh'
                            // optional className property, use only for testing
                            className='ring-4 ring-offset-8 ring-red-500/20'
                        />

                        {targetIds.map((targetId) => (
                            <Target
                                key={targetId}
                                // must specify the id property for target to work
                                id={targetId}
                                // the html element you want to render
                                as='section'
                                // add styling to your target
                                className='h-[90vh] border-4 p-5 w-full'
                                // the height in percent of observing zone to trigger inView state
                                // default is 0.5 (50 percent)
                                entryThreshold={0.3}
                            >
                                Target: {targetId}
                            </Target>
                        ))}
                    </div>
                </div>
            </div>
        </InViewProvider>
    )
}

const nav = Array.from(targetIds).map((targetId) => ({ targetId, href: '#' }))

function Navigation() {
    const inView = useInView()
    return (
        <div className='sticky top-10 h-screen'>
            <ul className='space-y-4'>
                {nav.map((item) => (
                    <li
                        key={item.targetId}
                        className={clsx('text-center w-32', {
                            'font-bold py-1 bg-red-500 text-white':
                                inView[item.targetId]
                        })}
                    >
                        <a href={item.href}>{item.targetId}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
