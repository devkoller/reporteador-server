export function getAgeGroup(fecha_nac?: string): string {
	if (!fecha_nac) return "Desconocido"

	const birth = new Date(fecha_nac)
	const now = new Date()

	const diffMs = now.getTime() - birth.getTime()
	const diffDays = diffMs / (1000 * 60 * 60 * 24)

	// 1. Menos de 30 días
	if (diffDays < 30) {
		return "0 - 30 días"
	}

	// 2. Entre 30 días y menos de 1 año
	if (diffDays < 365.25) {
		return "1 mes a menor de 1 año"
	}

	// A partir de aquí contamos en años completos
	const ageYears = Math.floor(diffDays / 365.25)

	// 3. De 1 a 4 años
	if (ageYears <= 4) {
		return "01 – 04 años"
	}

	// 4. Intervalos de 5 años (5–9, 10–14, …, 60–64)
	if (ageYears < 65) {
		const start = Math.floor((ageYears - 5) / 5) * 5 + 5
		const end = start + 4
		if (start < 10) {
			return `0${start}–0${end} años`
		}
		return `${start}–${end} años`
	}

	// 5. 65 años en adelante
	return "65+ años"
}

export function helpers() {
	return `
      const jsreport = require('jsreport-proxy')
      const qri = await jsreport.npm.require('qr-image@3.2.0')
      const moment = require('moment')
      const rowOffset = 6

      function nowStr () {
          return moment().format('YYYY-MM-DD')
      }

      function generateEmptyCell (repeat, className) {
          const cells = []

          for (let i = 0; i < repeat; i++) {
              cells.push('<td class="empty-cell"></td>')
          }

          return new Handlebars.SafeString(cells.join(''))
      }

      function oddClassName (index) {
          return (index + 1) % 2 !== 0 ? 'odd' : ''
      }

      function sum (a, b) {
          return a + b
      }

      function getDetailRowIndex (index) {
          return (index + 1) + rowOffset
      }
  
      async function barcode(text) {
          const png = qri.imageSync(text, { type: 'png' }).toString('base64')
          return 'data:image/png;base64,' + png;
      }
      
      async function qrs(text) {
          const png = text.split('|')
          return png[0]
      }
  
  
      function getPageNumber (pageIndex) {
          if (pageIndex == null) {
              return ''
          }
          const pageNumber = pageIndex + 1
          return pageNumber
      }
  
      function getTotalPages (pages) {
          if (!pages) {
              return ''
          }
          return pages.length
      }

       function json (json) {
        return JSON.stringify(json)
       }

       function formatText (str) {
          if(str === '0') {
            return ''
          }
          return str
       }

      
      
    `
}
