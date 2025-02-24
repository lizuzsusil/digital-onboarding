import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as sass from 'sass';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COLOR_REGEX = /^#([A-Fa-f0-9]{3}){1,2}$|^rgba?\([\d\s%,.]+\)$/;
const TRANSITION_REGEX = /^(all|[a-z-]+)\s+\d+ms?(?:\s+[a-z-]+(?:\([^)]+\))?)?$/i;
const BOX_SHADOW_REGEX = /^(inset\s+)?-?\d*\.?\d+px(\s+-?\d*\.?\d+px){2,4}\s+(rgba?\([^)]+\)|#[\da-fA-F]{3,8})?$/;
const CSS_UNIT_REGEX = /^-?\d*\.?\d+(px|rem|em|vh|vw|vmin|vmax|%)?$/;

const PATHS = {
    variables: path.resolve(__dirname, '../assets/styles/variables.scss'),
    output: path.resolve(__dirname, './theme/scssVariables.ts')
};

const isColor = value => COLOR_REGEX.test(value);
const isTransition = value => TRANSITION_REGEX.test(value);
const isBoxShadow = value => BOX_SHADOW_REGEX.test(value);
const isCssUnit = value => CSS_UNIT_REGEX.test(value);

function processValue(value) {
    return isCssUnit(value) ? parseFloat(value) :
        isColor(value) || isTransition(value) || isBoxShadow(value) ? value :
            value;
}

async function generateScssExports() {
    const scssContent = `
        @use 'variables' as *;
        
        :export {
            @each $key, $value in $variables-map {
                #{"" + $key}: #{$value};
            }
        }
    `;

    try {
        const { css } = sass.compileString(scssContent, {
            loadPaths: [path.dirname(PATHS.variables)],
            style: 'compressed'
        });

        const exportMatch = css.match(/:export{([^}]+)}/);
        if (!exportMatch) return;

        const variables = exportMatch[1]
            .split(';')
            .reduce((acc, line) => {
                const [key, value] = line.split(':').map(s => s.trim());
                return key && value ? { ...acc, [key]: processValue(value) } : acc;
            }, {});

        const tsContent = `/**\n * This file is auto-generated. Do not modify it.\n * It is generated during build time from SCSS variables.\n * Currently exported from: [(root)/assets/styles/variables.scss].\n */\nexport const variables = ${JSON.stringify(variables, null, 2)};`;

        fs.writeFileSync(PATHS.output, tsContent);
        console.log("🎉 TS file written to: file://" + process.cwd() + "/lib/theme/scssVariables.ts");
    } catch (error) {
        console.error('Error processing SCSS variables:', error);
        process.exit(1);
    }
}

generateScssExports().then(() => {
    console.log('🎉 SCSS variables have been successfully exported to the TypeScript file! ✅🎨🚀');
});