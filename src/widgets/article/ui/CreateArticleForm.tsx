import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/shared/ui/form';
import { Input } from '@/src/shared/ui/input';
import { Button } from '@/src/shared/ui/button';
import { Textarea } from '@/src/shared/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreateArticleDto } from '@/src/features/article/model/types';
import { useCreateArticle } from '@/src/features/article/model/useCreateArticle';

const formSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  link: z.string().url('올바른 URL을 입력해주세요'),
});

export function CreateArticleForm() {
  const router = useRouter();
  const { createArticle, isSubmitting } = useCreateArticle();

  const form = useForm<CreateArticleDto>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      link: '',
    },
  });

  const onSubmit = async (data: CreateArticleDto) => {
    try {
      await createArticle(data);
      router.push('/articles/my');
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="아티클 제목을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="아티클 내용을 입력하세요"
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>링크</FormLabel>
              <FormControl>
                <Input placeholder="원본 아티클 링크를 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push('/articles')}>
            취소
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '저장 중...' : '저장'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
