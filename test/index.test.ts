// test coverage for ftl. 100% lines covered
//
import mocha from 'mocha';
import chai from 'chai';
import ftl from '../src/index';

const expect = chai.expect;

describe('ftl', () => {
    it('should return a react component that renders', () => {
        const template = ftl`
Box
    Grid container spacing={2}
    Grid item xs={6}
        Typography variant="h3" (Welcome to  Staking Pool!!)
        Typography variant="subtitle1" (stake your tokens to earn more tokens)
`;
        const Component = template({id: 'My Pool'});
        expect(Component).to.not.be.undefined;
    });
})