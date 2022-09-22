let running = true;

let timeouts = [];

/**
 * Build a new background service which pauses for {@link interval} between runs.
 *
 * Won't crash when the worker throws.
 *
 * When the application is going to shut down any running callbacks will be run to the end.
 * Any pending callbacks will be cancelled.
 *
 * @param callback - The application code which should be executed at the given interval.
 * @param interval - The run interval in milliseconds.
 */
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
