import resetDb from '../custom/resetDb'
// describe('notify', () => {
//   beforeEach(() => {
//     //Reset the Database
//     resetDb()
//   })

//   it('should disable notifications', () => {
//     cy.visit('/provider', {
//       onBeforeLoad(win) {
//         const file = {
//           text: cy.stub().resolves('Hello, world!').as('text')
//         }
//         const fileHandle = {
//           getFile: cy.stub().resolves(file).as('file')
//         }
//         //  @ts-ignore
//         cy.stub(win, 'showOpenFilePicker')
//           .resolves([fileHandle])
//           .as('showOpenFilePicker')
//       }
//     })
//     // ?TODO from here
//   })
// })
