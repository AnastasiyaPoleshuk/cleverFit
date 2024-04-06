export const Hightlight = (filter: string, str: string) => {
    if (!filter) return str;
    const regexp = new RegExp(filter, 'ig');
    const matchValue = str.match(regexp);

    if (matchValue) {
        return str.split(regexp).map((s: string, index: number, array: string[]) => {
            if (index < array.length - 1) {
                const c = matchValue.shift();
                const key = `${index}${c}`;

                return (
                    <>
                        {s}
                        <span className='hightlight' data-test-id='highlight-matches' key={key}>
                            {c}
                        </span>
                    </>
                );
            }

            return s;
        });
    }

    return str;
};
