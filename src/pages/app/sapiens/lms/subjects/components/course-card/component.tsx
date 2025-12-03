import { Card, Image, View } from "reshaped";
import type { SubjectLms } from "../../../../../../../models";

interface Props {
  course: SubjectLms;
}

export const CourseCard = ({ course }: Props) => (
  <View width="100%">
    <Card padding={0}>
      <View aspectRatio={16 / 9}>
        <Image src={course.cover_url ?? ""} alt={course.name} />
      </View>
      <View padding={4}>{course.name}</View>
    </Card>
  </View>
);
