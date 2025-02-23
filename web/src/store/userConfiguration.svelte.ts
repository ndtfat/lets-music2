type Configuration = {
    background: string;
    theme: 'light' | 'dark';
    color: string
}

const createConfigurationStore = () => {
    const configuration = $state<Configuration>({
        background: '/default-bg.mp4',
        theme: 'light',
        color: '124, 216, 4'
    });

    return {
        get value() {
            return configuration;
        },
        update: <K extends keyof Configuration>(field: K, value: Configuration[K]) => {
            configuration[field] = value;
        },
    }
}

export const userConfiguration =  createConfigurationStore();