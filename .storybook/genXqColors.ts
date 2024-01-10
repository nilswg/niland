import fs from 'fs';
import path from 'path';

export function genXqColors(distPath: string) {
    const globalsCss = fs.readFileSync(path.resolve('./src/globals.css'), 'utf8');
    const lightColors = globalsCss.match(/@@start::light-xq-colors([\w\W]*)@@end::light-xq-colors/i)?.[1] || '';
    const darkColors = globalsCss.match(/@@start::dark-xq-colors([\w\W]*)@@end::dark-xq-colors/i)?.[1] || '';

    /**
     * @example
     * ```
     * inputs: lightColors  , regex: /--color-xq-(.*);/g
     * output: ['--color-xq-blue-1: #DDEEFF;', '--color-xq-blue-2:', '--color-xq-blue-3:', ...]
     * ```
     */
    const [_lightColors, _darkColors] = [lightColors, darkColors].map((css) => {
        const cssAttributes = css.match(/--color-xq-(.*);/g) || [];
        // console.log({ cssAttributes });

        return cssAttributes.map((attrib) => {
            /**
             * @example
             * ```
             * input: '--color-xq-blue-1: #DDEEFF;',  regex: /--color-xq-(.*):(.*);/i
             * output : ['--color-xq-blue-1: #DDEEFF;', 'blue-1', '#DDEEFF']
             * ```
             */
            const x = attrib.match(/--color-xq-(.*):(.*);/i) || [];
            if (!Array.isArray(x) || x.length < 3) {
                console.log('attrib not match:', { x });
                return { colorName: attrib, value: '' };
            }
            const colorName = x[1].trim();
            const value = x[2].trim();
            return { colorName, value, fullName: `--color-xq-${colorName}` };
        });
    });

    /**
     * @example
     * ```
     *  const args = [
     *      { colorName: 'blue-1', color: '#DDEEFF', color_dark: '#002288' },
     *      { colorName: 'blue-2', color: '#BBDDFF', color_dark: '#1133CC' },
     *      ...
     *  ]
     * ```
     */
    const colors = _lightColors.map((light, index) => {
        const dark = _darkColors[index];
        return {
            colorName: light.colorName,
            color_light: { fullName: light.fullName || '', value: light.value || '' },
            color_dark: { fullName: dark.fullName || '', value: dark.value || '' },
        };
    });

    fs.writeFileSync(distPath, JSON.stringify({ colors }));

    return colors;
}
