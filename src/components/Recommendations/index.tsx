import React from 'react';
import { Card, Paragraph } from '../../theme/index';
import Box from '../Box';
import Button from '../Button';

const Recommendations = ({ recommendedRotations, onSelectRotationRecommendation }: any) => {
    return (<>
        {
            recommendedRotations.map((item: any, index: number) => {
                return (
                    <Card key={`recommendation-item-${index}`}>
                        <Box
                            breakpoints={{
                                xs: {
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "20px",
                                },
                            }}
                        >
                            <Paragraph>
                                Rotation {index + 1}:
                            </Paragraph>
                            <Box>
                                <strong>
                                    Total scheduled timeline: {item.totalScheduled.toFixed(2)}%
                                </strong>
                            </Box>
                            <Button
                                onClick={() => {
                                    onSelectRotationRecommendation(item.rotation)
                                }}
                            >use this one</Button>

                        </Box>
                    </Card>
                )
            })
        }
    </>
    );
}
export default Recommendations;