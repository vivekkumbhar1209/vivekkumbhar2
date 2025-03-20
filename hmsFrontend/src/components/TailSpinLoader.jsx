import { waveform } from 'ldrs'
waveform.register()


const TailSpinLoader = () => {
    return (
        <div>
            <l-waveform size="20" stroke="1.5" speed="1" color="black"></l-waveform>
        </div>
    )
}

export default TailSpinLoader
