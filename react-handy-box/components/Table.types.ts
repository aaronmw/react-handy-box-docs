import { ReactNode } from 'react';
import { BoxPropsWithoutRef, BoxPropsWithRef } from './Box.types';

export type TableContextObject<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = {
  columnDescriptors: Array<ColumnDescriptor<RowShape, K>>;
  rowObjects: Array<RowShape>;
  sortDirection?: SortDirection;
  sortedColumnDescriptor: ColumnDescriptor<RowShape, K>;
};

export type BaseRowShape = {
  key: string | number;
  propsForContainer?: BoxPropsWithoutRef<'tr'>;
} & Record<string, ReactNode>;

export type SortDirection = 'ASC' | 'DESC';

export type BaseTableProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = {
  columnDescriptors: Array<ColumnDescriptor<RowShape, K>>;
  initialSortedColumnKey?: K;
  renderCells?: Record<K, TableCellRenderFunction<RowShape, K>>;
  renderHeaderCells?: Record<K, TableHeaderCellRenderFunction<RowShape, K>>;
  renderHeaderRow?: TableHeaderRowRenderFunction<RowShape, K>;
  renderRow?: TableRowRenderFunction<RowShape, K>;
  rowObjects: Array<RowShape>;
};

export type TableProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = BoxPropsWithoutRef<'table'> & BaseTableProps<RowShape, K>;

export type ColumnDescriptor<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = {
  key: K;
  customSortFunction?: (args?: {
    rowObjects?: Array<RowShape>;
    sortDirection?: SortDirection;
  }) => Array<RowShape>;
  initialSortDirection?: SortDirection;
  isSortable?: boolean;
  label: ReactNode;
  propsForCells?: BoxPropsWithRef<'td'>;
};

export type TableCellRenderProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = {
  cellContents: ReactNode;
  columnDescriptor: ColumnDescriptor<RowShape, K>;
  columnDescriptors: Array<ColumnDescriptor<RowShape, K>>;
  rowObject: RowShape;
  rowObjectIndex: number;
  rowObjects: Array<RowShape>;
};

export type TableCellRenderFunction<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = (args: TableCellRenderProps<RowShape, K>) => JSX.Element;

export type TableHeaderCellRenderProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = {
  cellContents: ReactNode;
  columnDescriptor: ColumnDescriptor<RowShape, K>;
  columnDescriptors: Array<ColumnDescriptor<RowShape, K>>;
  propsForCellContentsWrapper: BoxPropsWithRef<'button' | 'div'>;
  rowObjects: Array<RowShape>;
  sortDirection?: SortDirection;
  sortedColumnDescriptor?: ColumnDescriptor<RowShape, K>;
};

export type TableHeaderCellRenderFunction<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = (args: TableHeaderCellRenderProps<RowShape, K>) => JSX.Element;

export type TableRowRenderProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = {
  columnDescriptors: Array<ColumnDescriptor<RowShape, K>>;
  rowContents: ReactNode;
  rowObject: RowShape;
  rowObjectIndex: number;
  rowObjects: Array<RowShape>;
};

export type TableRowRenderFunction<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = (args: TableRowRenderProps<RowShape, K>) => JSX.Element;

export type TableHeaderRowRenderProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = {
  columnDescriptors: Array<ColumnDescriptor<RowShape, K>>;
  rowContents: ReactNode;
  rowObjects: Array<RowShape>;
};

export type TableHeaderRowRenderFunction<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = (args: TableHeaderRowRenderProps<RowShape, K>) => JSX.Element;

export type TableHeaderRowProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = BoxPropsWithoutRef<'tr'> & TableHeaderRowRenderProps<RowShape, K>;

export type TableHeaderCellProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = BoxPropsWithoutRef<'td'> & TableHeaderCellRenderProps<RowShape, K>;

export type TableRowProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = BoxPropsWithoutRef<'tr'> & TableRowRenderProps<RowShape, K>;

export type TableCellProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = BoxPropsWithoutRef<'td'> & TableCellRenderProps<RowShape, K>;
