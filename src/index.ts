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
    |Pipe indicates non-markup text
    Grid container spacing={2}
        Grid item xs={6}
            Typography variant="h3" (Welcome to ${id} Staking Pool!!)
            Typography variant="subtitle1" (stake your tokens to earn more tokens)
is converted to:
<Box>Pipe indicates non-markup text
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
const ftl = (strings: any, ...values: any) => {
    let template = strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '').trim();
    template = strings.reduce((acc: any, s: any, i: any) => {
        const value = values[i - 1];
        const lines = s.split('\n');
        const lastLine = lines.pop();
        if (lastLine) {
            acc.push(lastLine);
        }
        if (value) {
            acc.push(value);
        }
        if (lines.length) {
            acc.push(...lines);
        }
        return acc;
    }, []).filter(e => e.trim())
    console.log(template);
    const root = template.pop();
    const indent = root.match(/^\s*/)[0].length; 
    const lines = template.reverse(); 
    const stack = [root];
    const _props = (line: any) => {
        const [name, ...attrs] = line.trim().split(' ');
        const props: any = {};
        const events: any = {};
        for (const attr of attrs) {
            const [key, value] = attr.split('=');
            if (key.startsWith('on')) {
                events[key] = value;
            } else {
                props[key] = value;
            }
        }
        return {name, props, events};
    };
    for (const line of lines) {
        const lineIndent = line.match(/^\s*/)[0].length;
        const depth = (lineIndent - indent) / 4;
        const {name, props, events} = _props(line);
        const element:any = React.createElement(name, props, stack.pop());
        for (const [key, value] of Object.entries(events)) {
            element.props[key] = eval(value as any);
        }
        if (depth > 0) {
            stack[stack.length - 1].props.children = element;
        } else {
            stack.push(element);
        }
    }
    return (props: any) => {
        const element = React.cloneElement(stack.pop(), props);
        return element;
    };
};
export default ftl;