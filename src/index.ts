/* fast template language. Turn templates into react Components, Implementation
// License: MIT
// Author: Sebastian Schepis
SUMMARY:
1. Each line of the template is a markup element name, followed by a space-separated list of attributes with values. 
2. Events are specified as attributes with a value of the form `onEventName={handler}`.
3. The value of an attribute can be a string, a number, a boolean, or a nested template.
4. The value of an attribute can be a function call, which is equivalent to a nested template.
3. indenting is significant, and is used to determine the nesting of elements.
4. The first line of the template is the root element.
5. the first indent sets the indent for the entire template.
EXAMPLE:
Box
    Grid container spacing={2}
        Grid item xs={6}
            Typography variant="h3" (Welcome to ${id} Staking Pool!!)
            Typography variant="subtitle1" (stake your tokens to earn more tokens)
is converted to:
<Box>
    <Grid container spacing={2}>
        <Grid item xs={6}>
            <Typography variant="h3">Welcome to {id} Staking Pool!!</Typography>
            <Typography variant="subtitle1">stake your tokens to earn more tokens</Typography>
        </Grid>
    </Grid>
</Box>
Usage:
    const template = ftl`
        Box
            Grid container spacing={2}
                Grid item xs={6}
                    Typography variant="h3" (Welcome to ${id} Staking Pool!!)
                    Typography variant="subtitle1" (stake your tokens to earn more tokens)
    `
    const Component = template({id: 'My Pool'})
    ReactDOM.render(<Component />, document.getElementById('root'))
*/
import React from 'react';
const ftl: any = (strings: any, ...values: any) => {
    const template: any = strings.reduce((acc: any, str: any, i: string | number) => {
        const value: any = values[i];
        return acc + (value ? value : '') + str;
    });
    const lines: any = template
        .split('\n')
        .filter((e:any) => e.trim().length > 0)
    const indent: any = lines[1].match(/^\s*/)[0].length;
    const children: any = lines.slice(1).map((line: { match: (arg0: RegExp) => (string | any[])[]; trim: () => string }) => {
        const indent: any = line.match(/^\s*/)[0].length;
        const name: any = line.trim().split(' ')[0];
        const attributes: any = line.trim().split(' ').slice(1).reduce((acc: any, attr: any) => {
            const [key, value]: any = attr.split('=');
            acc[key] = value;
            return acc;
        }, {});
        return { indent, name, attributes };
    });
    const components: any = {};
    children.forEach((child: { indent: any; name: any; attributes: any }) => {
        const { indent, name, attributes } = child;
        const parent: any = components[indent - indent];
        const component: any = React.createElement(name, attributes, parent);
        components[indent] = component;
    });
    return (props: any) => {
        return React.cloneElement(components[indent], props);
    };
}
export default ftl;