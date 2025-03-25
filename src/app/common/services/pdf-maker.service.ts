import { Injectable } from '@angular/core';
// import pdfMake from 'pdfmake/build/pdfmake.min';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { isArray } from 'lodash';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
// pdfMake.vfs = pdfFonts?.pdfMake?.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfMakerService {

  constructor() { }


  private static instance: PdfMakerService;

  public static getInstance(): PdfMakerService {
    if (!PdfMakerService.instance) {
      PdfMakerService.instance = new PdfMakerService();
    }

    return PdfMakerService.instance;
  }

   fonts = {

    // download default Roboto font from cdnjs.com
    Roboto: {
      normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
      italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
      bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    },

 };

  public async generatePdf(title: string, content: any) {

    var dd:TDocumentDefinitions = {
      pageSize: 'A4',
      content: content,
      styles: {
        label: {
          fontSize: 13,
          bold: true,
          color: '#646464',
          margin: [0, 0, 0, 7]
        },
        rate_label: {
          fontSize: 12,
          bold: true,
          color: '#646464',
          margin: [0, 0, 0, 7]
        },
        light_blue_bg: {
          fillColor: '#E2EEFF'
        },
        dark_blue_bg: {
          fillColor: '#194381',
          color: '#FFFFFF'
        },
        white_font: {
          color: '#FFFFFF'
        },
        title: {
          fontSize: 15,
          bold: true,
          color: '#194381',
          margin: [0, 18, 0, 18]
        },
        value: {
          fontSize: 10,
          color: '#194381'
        },
        d_cell: {
          margin: [0, 0, 0, 18]
        },
        name: {
          fontSize: 12,
          bold: true
        },
        header: {
          fontSize: 13,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        small: {
          fontSize: 8
        },
        chargeName: {
          fontSize: 10,
          bold: true,
        },
        marginTop: {
          margin: [0, 10, 0, 0],
        }
      }
    }
    pdfMake.createPdf(dd, null as any, this.fonts).download(title);
  }


  public htmlToPdfContent(html: any): any {
    let content: any = htmlToPdfmake(html, {
      defaultStyles: {
        p: {
          marginLeft: 0,
          margin: 0,
          fontSize: 12,
        },

      }
    });
    if (isArray(content)) {
      content.forEach(x => {
        x.margin = 0;
        x.marginLeft = 0;
        x.marginRight = 0;
        x.marginBottom = 0;
        x.marginTop = 0;
      });
    } else {
      content.margin = 0;
      content.marginLeft = 0;
      content.marginRight = 0;
      content.marginBottom = 0;
      content.marginTop = 0;
    }

    return content;
  }
}
