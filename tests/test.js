const chai=require('chai');
const  assert=chai.assert;
const should=chai.should();
const expect=chai.expect;
const chaiHttp=require('chai-http');
chai.use(chaiHttp);

var server=require('../index');


// Test case1
describe('test',function(){
    
    // sending request with data in query 
    it('Test case 1',  () =>{
        chai.request(server)
        .get("/translate")
        .query({
            text: 'My name is Manvendra Rajpoot!',
            lang: 'mr'
        })
        .end((err,res)=>{
                expect(res.status).to.be.equal(200);
                console.log(res.text);
        })
    })
})

describe('test',function(){
    
    // sending request with data in url 
    it('Test case 2',  () =>{
        chai.request(server)
        .get("/translate?text=Howudoing&lang=hi")
        .end((err,res)=>{
                expect(res.status).to.be.equal(200);
                console.log(res.text);
        })
    })
})