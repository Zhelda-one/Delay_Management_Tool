const fileTypeHelpDialog = /** @type {FileTypeHelpDialog} */ getElementById('fileTypeHelpDialog');

class FileTypeHelpDialog extends Dialog {

    constructor(){
        super("File Type Information");

    }

    getFromUI() {

    }
    setToUI() {

    }

    onLoad(){
        // Reference to the table body
        const tableBody = this.querySelector("tbody");

        // Populate the table
        Object.entries(g_fileFormats).forEach(([key, value]) => {
            const row = document.createElement("tr");

            // Create cells for key and value
            const formatCell = document.createElement("td");
            formatCell.textContent = value.name;

            const descriptionCell = document.createElement("td");
            descriptionCell.textContent = value.description;

            const dataFormatCell = document.createElement("td");
            dataFormatCell.textContent = Enum_DataFormat_toString(value.dataFormat)

            const fileContentsCell = document.createElement("td");
            fileContentsCell.textContent = Enum_FileContents_toString(value.fileContents)

            const extensionsCell = document.createElement("td");
            extensionsCell.textContent = value.expectedFileExtensions.map(ext => `.${ext}`).join(', ');

            const dataDomainCell = document.createElement("td");
            dataDomainCell.textContent = Enum_DataDomain_toString(value.dataDomain);

            // Append cells to the row
            row.appendChild(formatCell);
            row.appendChild(descriptionCell);
            row.appendChild(dataFormatCell);
            row.appendChild(fileContentsCell);
            row.appendChild(extensionsCell);
            row.appendChild(dataDomainCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    }
}
customElements.define('bba-file-type-help-dialog', FileTypeHelpDialog);