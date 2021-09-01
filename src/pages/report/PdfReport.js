import React from "react";

import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

//redux
import { useSelector } from "react-redux";

//React PDF Table
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    // backgroundColor: "#E4E4E4",
    fontFamily: "Sarabun",
    paddingTop: 35,
    paddingBottom: 20,
    paddingHorizontal: 35,
    // paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  container: {
    alignSelf: "center",
    marginBottom: 10,
  },
});

Font.register({
  family: "Sarabun",
  fonts: [{ src: "./fonts/Sarabun/Sarabun-Regular.ttf" }],
});



const PdfReport = () => {
  const cartPDF = useSelector((state) => state.cartReducer.cartR);
  return (
    <PDFViewer className="container-fluid mt-3" height={600}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
            <Image style={{ width: 50 }} src="./logo512.png" />
          </View>
          <View>
            <Text style={styles.title}>รายงานการสั่งซื้อสินค้า</Text>
          </View>
          <Table data={cartPDF}>
            <TableHeader textAlign="center">
              <TableCell weighting={0.15}>รหัสสินค้า</TableCell>
              <TableCell weighting={0.5}>ชื่อสินค้า</TableCell>
              <TableCell weighting={0.25}>ราคา</TableCell>
              <TableCell weighting={0.25}>จำนวน.</TableCell>
              <TableCell weighting={0.25}>รวม</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell
                weighting={0.15}
                style={{ textAlign: "center" }}
                getContent={(r) => r.id}
              />
              <DataTableCell weighting={0.5} getContent={(r) => r.name} />
              <DataTableCell
                weighting={0.25}
                style={{ textAlign: "center" }}
                getContent={(r) => r.price}
              />
              <DataTableCell
                weighting={0.25}
                style={{ textAlign: "center" }}
                getContent={(r) => r.qty}
              />
              <DataTableCell
                weighting={0.25}
                style={{ textAlign: "center" }}
                getContent={(r) => r.qty * r.price}
              />
            </TableBody>
          </Table>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfReport;
