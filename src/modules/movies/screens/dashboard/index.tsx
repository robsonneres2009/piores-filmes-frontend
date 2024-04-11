import DashProducers from "@/modules/movies/screens/dashboard/components/dash-producers/dash-producers";
import DashStudiosWithWin from "@/modules/movies/screens/dashboard/components/dash-studios-with-win/dash-studios-with-win";
import DashWinnersToYear from "@/modules/movies/screens/dashboard/components/dash-winners-to-years/dash-winners-to-year";
import DashYearsWithMultipleWinners from "@/modules/movies/screens/dashboard/components/dash-years-with-multiple-winners/dash-years-with-multiple-winners";
import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";

export default function DashBoardScreen() {
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} padding={6}>
        <GridItem w="100%">
          <Card>
            <CardHeader>
              <Heading size="md">List years with multiple winners</Heading>
            </CardHeader>
            <CardBody>
              <DashYearsWithMultipleWinners />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem w="100%">
          <Card>
            <CardHeader>
              <Heading size="md">Top 3 studios with winners</Heading>
            </CardHeader>
            <CardBody>
              <DashStudiosWithWin />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem w="100%">
          <DashProducers />
        </GridItem>

        <GridItem w="100%">
          <Card>
            <CardHeader>
              <Heading size="md">List movies winners by year</Heading>
            </CardHeader>
            <CardBody>
              <DashWinnersToYear />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
}
