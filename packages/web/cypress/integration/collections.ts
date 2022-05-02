import data from "../fixtures/fsaDb.json";

describe("Collection Tests", () => {
  beforeEach(() => {
    //Reset the Database
    cy.visit("/");
    cy.intercept("testing/fsaDb.data", data);
    cy.get("#request_btn").click();
    //go to the Test view page.
    cy.get('[data-test-cy="TestPageLink"]').click();
  });

 

  it("should remove all files from collections when root directories are deleted", () => {
    cy.get("#addCollectionInput").clear();
    cy.get('[data-cy="collectionList"] > li').should("have.length", 0);
    cy.get("#addCollectionInput").type("test").should("have.value", "test");
    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-cy="collectionList"] > li').should("have.length", 1);

    // select root_1 and add three items
    cy.get('[data-cy="selectRootDir_root_1"]').click();
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[data-testid="filesForRootDirListItem-2"]').click();
    cy.get('[data-testid="filesForRootDirListItem-4"]').click();

    cy.get('[data-cy="selectRootDir_root_2"]').click();
    cy.get('[data-testid="filesForRootDirListItem-6"]').click();
    cy.get('[data-testid="filesForRootDirListItem-7"]').click();
    cy.get('[data-testid="filesForRootDirListItem-8"]').click();
    cy.get('[data-cy="currentCollection"] > li').should("have.length", 6);

    cy.get('[data-testid="rootDirectories"] > ul > :nth-child(3)').click();
    cy.get('[data-cy="selectRootDir_root_3"]').click();
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[data-testid="filesForRootDirListItem-1"]').click();
    cy.get('[data-cy="currentCollection"] > li').should("have.length", 8);

    cy.get('[data-cy="deleteRootDir_root_1"]').click();
    cy.get('[data-cy="currentCollection"] > li').should("have.length", 5);
    cy.get('[data-cy="deleteRootDir_root_2"]').click();
    cy.get('[data-cy="currentCollection"] > li').should("have.length", 2);
    cy.get('[data-cy="deleteRootDir_root_3"]').click();
    cy.get('[data-cy="currentCollection"] > li').should("have.length", 0);
  });
  it('should add a collection named "test-collection" when typed in the input field', () => {
    cy.get("#addCollectionInput")
      .clear()
      .type("test-collection")
      .should("have.value", "test-collection");
  });

  it('add a collection called  "collection" when a collection name that is spaces/blank is entered', () => {
    cy.get("#addCollectionInput").clear().type(" ").should("have.value", " ");
    cy.get('[data-cy="collectionList"] > li').should("have.length", 0);
    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-cy="collectionList"] > li').should("have.length", 1);
    cy.get('[data-cy="selectCollection-0"] > :nth-child(1)').should(
      "have.text",
      "collection"
    );
  });

  it('clicking the add button should add a collection named "collection"', () => {
    cy.get('[data-cy="collectionList"] > li').should("have.length", 0);
    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-cy="collectionList"] > li').should("have.length", 1);
    cy.get('[data-cy="selectCollection-0"] > :nth-child(1)').should(
      "have.text",
      "collection"
    );
  });

  it('clicking the add button twice should add a collection named "collection_1"', () => {
    cy.get('[data-cy="collectionList"] > li').should("have.length", 0);
    // cy.get("#addCollectionInput").type("")
    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-cy="collectionList"] > li').should("have.length", 2);
    cy.get('[data-cy="selectCollection-0"] > :nth-child(1)').should(
      "have.text",
      "collection_1"
    );
  });

  it("clicking the remove button should remove the collection", () => {
    cy.get('[data-cy="collectionList"] > li').should("have.length", 0);
    // cy.get("#addCollectionInput").type("")
    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-cy="collectionList"] > li').should("have.length", 1);
    cy.get('[data-cy="selectCollection-0"] > :nth-child(1)').should(
      "have.text",
      "collection"
    );
    cy.get('[data-cy="deleteCollection-0"]').click();
    cy.get('[data-cy="collectionList"] > li').should("have.length", 0);
  });

  it("should remove all files when the clear button is clicked", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="selectRootDir_root_1"]').click();
    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-cy="collectionList"] > li').should("have.length", 1);
    cy.get('[data-cy="currentCollection"] > li').should("have.length", 0);
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[data-testid="filesForRootDirListItem-1"]').click();
    cy.get('[data-testid="filesForRootDirListItem-2"]').click();
    cy.get('[data-testid="filesForRootDirListItem-3"]').click();
    cy.get('[data-testid="filesForRootDirListItem-4"]').click();
    cy.get('[data-testid="filesForRootDirListItem-5"]').click();
    cy.get('[data-testid="filesForRootDirListItem-7"]').click();
    cy.get('[data-testid="filesForRootDirListItem-8"]').click();
    cy.get('[data-testid="filesForRootDirListItem-11"]').click();
    cy.get('[data-testid="filesForRootDirListItem-12"]').click();
    cy.get('[data-cy="currentCollection"] > li').should("have.length", 10);
    cy.get('[data-cy="clearCollection-0"]').click();
    cy.get('[data-cy="currentCollection"] > li').should("have.length", 0);
  });

  it("should delete the collection the button delete is clicked", () => {
    cy.get('[data-cy="selectRootDir_root_1"]').click();
    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-cy="collectionList"] > li').should("have.length", 1);
    cy.get('[data-cy="currentCollection"] > li').should("have.length", 0);
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[data-testid="filesForRootDirListItem-1"]').click();
    cy.get('[data-testid="filesForRootDirListItem-2"]').click();
    cy.get('[data-testid="filesForRootDirListItem-3"]').click();
    cy.get('[data-testid="filesForRootDirListItem-4"]').click();
    cy.get('[data-testid="filesForRootDirListItem-5"]').click();
    cy.get('[data-testid="filesForRootDirListItem-7"]').click();
    cy.get('[data-testid="filesForRootDirListItem-8"]').click();
    cy.get('[data-testid="filesForRootDirListItem-11"]').click();
    cy.get('[data-testid="filesForRootDirListItem-12"]').click();
    cy.get('[data-cy="currentCollection"] > li').should("have.length", 10);
    cy.get('[data-cy="deleteCollection-0"]').click();
    cy.get('[data-cy="currentCollection"] > li').should("have.length", 0);
  });
  it("should create a copy the collection the button copy is clicked", () => {
    cy.get('[data-cy="selectRootDir_root_1"]').click();
    cy.get('[data-cy="addCollectionButton"]').click();
    cy.get('[data-cy="collectionList"] > li').should("have.length", 1);
    cy.get('[data-cy="currentCollection"] > li').should("have.length", 0);
    cy.get('[data-testid="filesForRootDirListItem-0"]').click();
    cy.get('[data-testid="filesForRootDirListItem-1"]').click();
    cy.get('[data-testid="filesForRootDirListItem-2"]').click();
    cy.get('[data-testid="filesForRootDirListItem-3"]').click();
    cy.get('[data-testid="filesForRootDirListItem-4"]').click();
    cy.get('[data-testid="filesForRootDirListItem-5"]').click();
    cy.get('[data-testid="filesForRootDirListItem-7"]').click();
    cy.get('[data-testid="filesForRootDirListItem-8"]').click();
    cy.get('[data-testid="filesForRootDirListItem-11"]').click();
    cy.get('[data-testid="filesForRootDirListItem-12"]').click();
    cy.get('[data-cy="currentCollection"] > li').should("have.length", 10);
    cy.get('[data-cy="copyCollection-0"]').click();
    cy.get('[data-cy="collectionList"] > li').should("have.length", 2);
    cy.get('[data-cy="currentCollection"] > li').should("have.length", 10);
    cy.get('[data-cy="selectCollection-0"] > :nth-child(1)').should(
      "have.text",
      "collection_copy"
    );
  });
});

export {};
