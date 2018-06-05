let running = true;

let timeouts = [];

export function build(callback: () => Promise<void>, interval = 5000): () => Promise<void> {
    return async() => {
        while (running) {
            try {
                await callback();
            }catch (err) {
                console.error(err);
            }
            await timeout(interval);
        }
    };
}

const timeout = (time: number) => new Promise(resolve => {
    const handle = setTimeout(() => {
        timeouts = timeouts.filter(h => h !== handle);
        return resolve();
    }, time);
    timeouts = [...timeouts, handle];
});

process.on('exit', () => {
    running = false;
    timeouts.forEach(timeout => clearTimeout(timeout));
});
